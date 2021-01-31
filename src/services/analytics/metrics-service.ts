import type { Course } from "../course/course";
import firebase from "firebase/app";
import "firebase/database";
import type { Lo, Student } from "../course/lo";
import type { DayMeasure, Metric, MetricDelete, MetricUpdate, User, UserMetric } from "./metrics-types";
import { decrypt } from "../utils/utils";
import { studentsOnline } from "../course/stores";
import type { Topic } from "../course/topic";

export class MetricsService {
  course: Course;
  users = new Map<string, UserMetric>();
  userRefresh = new Map<string, number>();
  allLabs: Lo[] = [];
  courseBase = "";
  metricUpdate: MetricUpdate = null;
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
        if (this.metricDelete) {
          this.metricDelete(this.users.get(nickname));
        }
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

  userOnlineStatusChange(user: User, status: string) {
    if (!this.canUpdate) return;
    if (status === "offline") {
      user.onlineStatus = status;
      const student = this.userRefresh.get(user.nickname);
      if (student) {
        this.userRefresh.delete(user.nickname);
        if (this.metricDelete) {
          this.metricDelete(this.users.get(user.nickname));
        }
      }
    } else {
      user.onlineStatus = "online";
      this.userUpdate(user);
    }
  }

  metricChange(user: User, topic: Topic, lab: Lo) {
    if (!this.canUpdate) return;
    this.userUpdate(user);
    if (this.metricUpdate) {
      this.metricUpdate(user, topic, lab, Date.now());
    }
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

  findInMetrics(title: string, metrics: Metric[]): Metric {
    let result: Metric = null;
    for (let metric of metrics) {
      if (metric.id === "ab" || metric.id === "alk" || metric.id === "ideo") {
        // console.log("ignoring spurious data"); as result of bug in analytics
        // since fixed, but bad data in some user dbs.
      } else {
        result = this.findInMetric(title, metric);
        if (result != null) {
          return result;
        }
      }
    }
    return result;
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
        if (user.onlineStatus == undefined) {
          user.onlineStatus = "online";
        }
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

  startListening(metricUpdate: MetricUpdate, metricDelete: MetricDelete) {
    this.metricUpdate = metricUpdate;
    this.metricDelete = metricDelete;
  }

  stopListening() {
    this.metricUpdate = null;
    this.metricDelete = null;
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
        this.subscribeToUserStatus(user, userEmailSanitised);
      });
    } catch (e) {
      console.log("no users yet");
    }
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
      .ref(`${this.courseBase}/users/${email}/onlineStatus`)
      .on("value", function (snapshot) {
        that.userOnlineStatusChange(user, snapshot.val());
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
          that.metricChange(user, null, lab);
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
            that.metricChange(user, topic, null);
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
