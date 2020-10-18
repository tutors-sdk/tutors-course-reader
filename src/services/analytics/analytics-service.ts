import { GoogleAnalytics } from "./google-analytics";
import * as firebase from "firebase/app";
import "firebase/database";
import type { Lo } from "../course/lo";
import type { Course } from "../course/course";
import type { User } from "./auth-service";
import { getKeys } from "../../environment";
import {
  getNode,
  updateLastAccess,
  updateVisits,
  updateCount,
  updateCountValue,
  updateStr,
} from "../utils/firebaseutils";
import { checkAuth } from "./auth-service";

let currentAnalytics: AnalyticsService = null;
let currentCourse: Course = null;
let currentRoute = "";
let currentLo: Lo = null;

let mins = 0;
const func = () => {
  mins = mins + 0.5;
  if (currentCourse && !document.hidden) {
    currentAnalytics.reportPageCount(currentRoute, currentCourse, currentLo);
  }
};
setInterval(func, 30 * 1000);

export class AnalyticsService {
  courseBaseName = "";
  userEmail = "";
  userEmailSanitised = "";
  userId = "";
  firebaseIdRoot = "";
  firebaseEmailRoot = "";
  url = "";

  ga = new GoogleAnalytics();

  constructor() {
    firebase.initializeApp(getKeys().firebase);
    currentAnalytics = this;
  }

  pageLoad(route: string, course: Course, lo: Lo) {
    currentCourse = course;
    currentRoute = route;
    currentLo = lo;
    if (course.authLevel > 0 && lo.type != "course") {
      checkAuth(course, "course", this);
    }
    this.reportPageLoad(route, course, lo);
  }

  initRoot(url: string) {
    this.url = url;
    this.courseBaseName = url.substr(0, url.indexOf("."));
    this.firebaseIdRoot = `${this.courseBaseName}/usage`;
  }

  reportLogin(user: User, url: string) {
    if (this.userEmail !== user.email || this.url !== url) {
      this.initRoot(url);
      this.userEmail = user.email;
      this.userId = user.userId;
      this.userEmailSanitised = user.email.replace(/[`#$.\[\]\/]/gi, "*");
      this.firebaseEmailRoot = `${this.courseBaseName}/users/${this.userEmailSanitised}`;
      this.updateLogin(user);
      this.ga.login(user, url);
    }
  }

  reportPageLoad(path: string, course: Course, lo: Lo) {
    if (!lo) return;
    this.initRoot(course.url);
    let node = getNode(lo.type, course.url, path);
    updateLastAccess(this.firebaseIdRoot, node, lo.title);
    updateVisits(this.firebaseIdRoot, node, lo.title);

    updateLastAccess(`all-course-access/${this.courseBaseName}`, "", lo.title);
    updateVisits(`all-course-access/${this.courseBaseName}`, "", lo.title);

    if (this.userEmail) {
      updateLastAccess(this.firebaseEmailRoot, node, lo.title);
      updateVisits(this.firebaseEmailRoot, node, lo.title);
    }
    this.ga.reportPageLoad(path, course, lo);
  }

  reportPageCount(path: string, course: Course, lo: Lo) {
    if (!lo) return;
    this.initRoot(course.url);
    let node = getNode(lo.type, course.url, path);
    updateLastAccess(this.firebaseIdRoot, node, lo.title);
    updateCount(this.firebaseIdRoot, node, lo.title);
    if (this.userEmail) {
      updateLastAccess(this.firebaseEmailRoot, node, lo.title);
      updateCount(this.firebaseEmailRoot, node, lo.title);
    }
  }

  updateLogin(user: User) {
    updateStr(`${this.firebaseEmailRoot}/email`, user.email);
    updateStr(`${this.firebaseEmailRoot}/name`, user.name);
    updateStr(`${this.firebaseEmailRoot}/id`, user.userId);
    updateStr(`${this.firebaseEmailRoot}/nickname`, user.nickname);
    updateStr(`${this.firebaseEmailRoot}/picture`, user.picture);
    updateStr(`${this.firebaseEmailRoot}/last`, new Date().toString());
    updateCountValue(`${this.firebaseEmailRoot}/count`);
  }
}
