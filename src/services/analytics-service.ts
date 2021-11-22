import firebase from "firebase/app";
import "firebase/database";
import type { Lo } from "tutors-reader-lib/src/course/lo";
import type { Course } from "tutors-reader-lib/src/course/course";

import { checkAuth } from "./auth-service";
import { getKeys } from "../environment";

import type { User } from "tutors-reader-lib/src/utils/auth-utils";

import {
  getNode,
  updateCalendar,
  updateCount,
  updateCountValue,
  updateLastAccess,
  updateStr,
  updateVisits
} from "tutors-reader-lib/src/utils/firebase-utils";

let currentAnalytics: AnalyticsService = null;
let currentCourse: Course = null;
let currentRoute = "";
let currentLo: Lo = null;

let mins = 0;
const func = () => {
  mins = mins + 0.5;
  if (currentCourse && !document.hidden && getKeys().firebase.apiKey !== "XXX") {
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

  constructor() {
    if (getKeys().firebase.apiKey !== "XXX") {
      if (!firebase.apps.length) firebase.initializeApp(getKeys().firebase);
    }
    currentAnalytics = this;
  }

  setOnlineStatus(course: Course, status: boolean) {
    currentCourse = course;
    checkAuth(course, "course", this);
    this.firebaseEmailRoot = `${this.courseBaseName}/users/${this.userEmailSanitised}`;
    if (status) {
      updateStr(`${this.firebaseEmailRoot}/onlineStatus`, "online");
    } else {
      updateStr(`${this.firebaseEmailRoot}/onlineStatus`, "offline");
    }
  }

  pageLoad(route: string, course: Course, lo: Lo) {
    if (getKeys().firebase.apiKey === "XXX") return;

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
    if (this.courseBaseName.startsWith("master--") || this.courseBaseName.startsWith("main--")) return;

    if (this.userEmail !== user.email || this.url !== url) {
      this.initRoot(url);
      this.userEmail = user.email;
      this.userId = user.userId;
      this.userEmailSanitised = user.email.replace(/[`#$.\[\]\/]/gi, "*");
      this.firebaseEmailRoot = `${this.courseBaseName}/users/${this.userEmailSanitised}`;
      this.updateLogin(user);
    }
  }

  reportPageLoad(path: string, course: Course, lo: Lo) {
    if (this.courseBaseName.startsWith("master--") || this.courseBaseName.startsWith("main--")) return;

    if (!lo) return;
    this.initRoot(course.url);
    let node = getNode(lo.type, course.url, path);
    updateLastAccess(this.firebaseIdRoot, node, lo.title);
    updateVisits(this.firebaseIdRoot, node, lo.title);

    updateLastAccess(`all-course-access/${this.courseBaseName}`, "", lo.title);
    updateVisits(`all-course-access/${this.courseBaseName}`, "", lo.title);

    if (this.userEmail) {
      this.firebaseEmailRoot = `${this.courseBaseName}/users/${this.userEmailSanitised}`;
      updateLastAccess(this.firebaseEmailRoot, node, lo.title);
      updateVisits(this.firebaseEmailRoot, node, lo.title);
    }
  }

  reportPageCount(path: string, course: Course, lo: Lo) {
    if (this.courseBaseName.startsWith("master--") || this.courseBaseName.startsWith("main--")) return;

    if (!lo) return;
    this.initRoot(course.url);
    let node = getNode(lo.type, course.url, path);
    updateLastAccess(this.firebaseIdRoot, node, lo.title);
    updateCount(this.firebaseIdRoot, node, lo.title);
    if (this.userEmail) {
      updateLastAccess(this.firebaseEmailRoot, node, lo.title);
      updateCount(this.firebaseEmailRoot, node, lo.title);
      updateCalendar(this.firebaseEmailRoot);
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

  async fetchAllCourseList() {
    const snapshot = await firebase.database().ref("all-course-access").once("value");
    const courseObjs: any = snapshot.val();
    const courseList: any[] = [];
    for (const [key, value] of Object.entries(courseObjs)) {
      const course: any = value;
      course.url = key;
      courseList.push(course);
    }
    courseList.sort((a, b) => Number(b.visits) - Number(a.visits));
    return courseList;
  }

  deleteCourseFromList(url: string) {
    let ref = firebase.database().ref(`all-course-access/${url}`);
    ref.remove();
    console.log(`deleting: ${url} as invalid`);
  }
}
