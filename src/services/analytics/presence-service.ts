import type { Course } from "../course/course";
import type { MetricUpdate, User, UserMetric } from "./metrics-types";
import firebase from "firebase";

let canUpdate = false;
const func = () => {
  canUpdate = true;
};

export class PresenceService {
  course: Course;
  users = new Map<string, UserMetric>();
  liveUsers = new Map<string, number>();
  courseBaseName = "";

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

  topicUpdate(user: User, topic: string) {
    if (canUpdate) {
      this.liveUsers.set(user.nickname, Date.now());
      console.log(user);
      console.log(topic);
    }
  }

  async fetchAllUsers(course: Course) {
    const users = new Map<string, UserMetric>();
    const that = this;
    const courseBaseName = course.url.substr(0, course.url.indexOf("."));
    const snapshot = await firebase.database().ref(`${courseBaseName}`).once("value");
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
        users.set(user.nickname, user);
      }
    }
    this.users = users;
    return users;
  }

  async startService(course: Course) {
    setTimeout(func, 30 * 1000);
    this.course = course;
    await this.fetchAllUsers(this.course);
    this.courseBaseName = course.url.substr(0, course.url.indexOf("."));
    this.users.forEach((user) => {
      const userEmailSanitised = user.email.replace(/[`#$.\[\]\/]/gi, "*");
      this.subscribeToUserUpdates(user, userEmailSanitised);
    });
  }

  stopService() {
    this.users.forEach((user) => {
      const userEmailSanitised = user.email.replace(/[`#$.\[\]\/]/gi, "*");
      this.unsubscribeToUserUpdates(user, userEmailSanitised);
    });
  }

  subscribeToUserUpdates(user, email: string) {
    const that = this;
    const topics = this.course.topics;

    topics.forEach((topic) => {
      const route = `${this.courseBaseName}/users/${email}/${topic.lo.id}`;
      firebase
        .database()
        .ref(route)
        .on("value", function (snapshot) {
          const datum = snapshot.val();
          if (datum && datum.title) {
            if (that.topicUpdate) that.topicUpdate(user, topic.lo.title);
          }
        });
    });
  }

  unsubscribeToUserUpdates(user, email: string) {
    const topics = this.course.topics;
    topics.forEach((topic) => {
      const route = `${this.courseBaseName}/users/${email}/${topic.lo.id}`;
      firebase.database().ref(route).off();
    });
  }
}
