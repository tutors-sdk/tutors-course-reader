import type { Course } from "../course/course";
import firebase from "firebase/app";
import "firebase/database";
import type { Lo, Student } from "../course/lo";
import type { DayMeasure, Metric, MetricDelete, MetricUpdate, User, UserMetric } from "./metrics-types";
import { decrypt } from "../utils/utils";
import { studentsOnline } from "../course/stores";
import { getUserId } from "./auth-service";

export class MetricsService {
  course: Course;
  users = new Map<string, UserMetric>();
  userRefresh = new Map<string, number>();
  allLabs: Lo[] = [];
  courseBase = "";
  labUpdate: MetricUpdate = null;
  topicUpdate: MetricUpdate = null;
  metricDelete: MetricDelete = null;
  canUpdate = false;

  constructor(course: Course) {
    this.course = course;
    this.courseBase = course.url.substr(0, course.url.indexOf("."));
    this.allLabs = this.course.walls.get("lab");
    setInterval(this.sweepAndPurge.bind(this), 1000 * 120);
  }

  diffMinutes(dt2, dt1) {
    var diff = (dt2 - dt1) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  sweepAndPurge() {
    this.userRefresh.forEach((timeStamp, nickname) => {
      const diff = this.diffMinutes(timeStamp, Date.now());
      if (diff >= 5) {
        this.userRefresh.delete(nickname);
        this.metricDelete(this.users.get(nickname));
      }
    });
  }

  getLiveCount() {
    return this.userRefresh.size;
  }

  getLiveUsers(): User[] {
    const users: User[] = [];
    this.userRefresh.forEach((value, nickname) => {
      const user = this.users.get(nickname);
      users.push(user);
    });
    return users;
  }

  userUpdate(user: User) {
    const timeStamp = Date.now();
    this.userRefresh.set(user.nickname, timeStamp);
    studentsOnline.set(this.userRefresh.size);
  }

  expandGenericMetrics(id: string, fbData): any {
    let metric = {
      id: "",
      metrics: [],
    };
    metric.id = id;
    Object.entries(fbData).forEach(([key, value]) => {
      if (typeof value === "object") {
        metric.metrics.push(this.expandGenericMetrics(key, value));
      } else {
        metric[key] = value;
      }
    });
    return metric;
  }

  findInMetric(title: string, metric: Metric) {
    if (title === metric.title) {
      return metric;
    } else if (metric.metrics.length > 0) {
      return this.findInMetrics(title, metric.metrics);
    } else {
      return null;
    }
  }

  findInMetrics(title: string, metrics: Metric[]) {
    for (let metric of metrics) {
      const result = this.findInMetric(title, metric);
      if (result != null) {
        return result;
      }
    }
    return null;
  }

  findInUser(title: string, metric: UserMetric) {
    return this.findInMetrics(title, metric.metrics);
  }

  populateLabUsage(user: UserMetric, allLabs: Lo[]) {
    user.labActivity = [];
    for (let lab of allLabs) {
      const labActivity = this.findInUser(lab.title, user);
      user.labActivity.push(labActivity);
    }
  }

  populateCalendar(user: UserMetric) {
    user.calendarActivity = [];
    const calendar = user.metrics.find((e) => e.id === "calendar");
    if (calendar) {
      for (const [key, value] of Object.entries(calendar)) {
        if (key.startsWith("20")) {
          const dayMeasure: DayMeasure = {
            date: key,
            dateObj: Date.parse(key),
            metric: value,
          };
          user.calendarActivity.push(dayMeasure);
        }
      }
    }
  }

  async fetchUserById(userId: string) {
    const userEmail = decrypt(userId);
    const userEmailSanitised = userEmail.replace(/[`#$.\[\]\/]/gi, "*");
    const snapshot = await firebase.database().ref(`${this.courseBase}/users/${userEmailSanitised}`).once("value");
    const user = this.expandGenericMetrics("root", snapshot.val());
    this.populateCalendar(user);
    if (this.allLabs) {
      this.populateLabUsage(user, this.allLabs);
    }
    return user;
  }

  async fetchAllUsers() {
    const users = new Map<string, UserMetric>();
    const that = this;
    const snapshot = await firebase.database().ref(`${this.courseBase}`).once("value");
    const genericMetrics = this.expandGenericMetrics("root", snapshot.val());

    const usage = genericMetrics.metrics[0];
    for (let userMetric of genericMetrics.metrics[1].metrics) {
      if (userMetric.nickname) {
        const user = {
          userId: userMetric.id,
          email: userMetric.email,
          name: userMetric.name,
          picture: userMetric.picture,
          nickname: userMetric.nickname,
          onlineStatus: userMetric.onlineStatus,
          id: "home",
          title: userMetric.title,
          count: userMetric.count,
          last: userMetric.last,
          duration: userMetric.duration,
          metrics: userMetric.metrics,
          labActivity: [],
          calendarActivity: [],
        };
        this.populateCalendar(user);
        if (this.allLabs) {
          this.populateLabUsage(user, this.allLabs);
        }
        users.set(user.nickname, user);
      }
    }
    this.users = users;
    return users;
  }

  filterUsers(users: Map<string, UserMetric>, students: Student[]) {
    const enrolledUsersMap = new Map<string, Student>();
    students.forEach((student) => {
      enrolledUsersMap.set(student.github, student);
    });
    users.forEach((user) => {
      const student = enrolledUsersMap.get(user.nickname);
      if (student) {
        user.name = student.name;
      } else {
        users.delete(user.nickname);
      }
    });
    return users;
  }

  async subscribeToAllUsers() {
    try {
      await this.fetchAllUsers();
      this.canUpdate = false;
      const func = () => {
        this.canUpdate = true;
      };
      setTimeout(func, 20 * 1000);
      this.users.forEach((user) => {
        const userEmailSanitised = user.email.replace(/[`#$.\[\]\/]/gi, "*");
        if (this.allLabs) this.subscribeToUserLabs(user, userEmailSanitised);
        if (this.course.topics) this.subscribeToUserTopics(user, userEmailSanitised);
        //this.subscribeToUserStatus(user, userEmailSanitised);
      });
    } catch (e) {
      console.log("no users yet");
    }
  }

  startListening(labUpdate: MetricUpdate, topicUpdate: MetricUpdate, metricDelete: MetricDelete) {
    this.labUpdate = labUpdate;
    this.topicUpdate = topicUpdate;
    this.metricDelete = metricDelete;
  }

  stopListening() {
    this.labUpdate = null;
    this.topicUpdate = null;
    this.metricDelete = null;
  }
  // stopService() {
  //   this.users.forEach((user) => {
  //     const userEmailSanitised = user.email.replace(/[`#$.\[\]\/]/gi, "*");
  //     this.unsubscribeToUserLabs(user, userEmailSanitised);
  //     this.unsubscribeToUserTopics(user, userEmailSanitised);
  //   });
  // }

  subscribeToUserStatus(user: User, email: string) {
    const that = this;
    firebase
      .database()
      .ref(`${this.courseBase}/users/${email}`)
      .on("value", function (snapshot) {
        const userUpdate = that.expandGenericMetrics("root", snapshot.val());
        const user = that.users.get(userUpdate.nickname);
        if (user) user.onlineStatus = userUpdate.onlineStatus;
      });
  }

  subscribeToUserLabs(user: User, email: string) {
    const that = this;
    this.allLabs.forEach((lab) => {
      const labRoute = lab.route.split("topic");
      const route = `${this.courseBase}/users/${email}/topic${labRoute[1]}`;
      firebase
        .database()
        .ref(route)
        .on("value", function (snapshot) {
          if (that.canUpdate) {
            that.userUpdate(user);
            if (that.labUpdate) that.labUpdate(user, lab.title);
          }
        });
    });
  }

  subscribeToUserTopics(user, email: string) {
    const that = this;
    const topics = this.course.topics;

    topics.forEach((topic) => {
      const route = `${this.courseBase}/users/${email}/${topic.lo.id}`;
      firebase
        .database()
        .ref(route)
        .on("value", function (snapshot) {
          const datum = snapshot.val();
          if (datum && datum.title) {
            if (that.canUpdate) {
              that.userUpdate(user);
              if (that.topicUpdate) {
                that.topicUpdate(user, topic.lo.title);
              }
            }
          }
        });
    });
  }

  unsubscribeToUserLabs(user: User, email: string) {
    this.allLabs.forEach((lab) => {
      const labRoute = lab.route.split("topic");
      const route = `${this.courseBase}/users/${email}/topic${labRoute[1]}`;
      firebase.database().ref(route).off();
    });
  }

  unsubscribeToUserTopics(user, email: string) {
    const topics = this.course.topics;
    topics.forEach((topic) => {
      const route = `${this.courseBase}/users/${email}/${topic.lo.id}`;
      firebase.database().ref(route).off();
    });
  }
}
