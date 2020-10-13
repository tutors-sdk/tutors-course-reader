import { GoogleAnalytics } from "./google-analytics";
import * as firebase from "firebase/app";
import "firebase/database";
import type { Lo } from "./lo";
import type { Course } from "./course";
import type { User } from "./auth-service";
import { getKeys } from "../environment";
import {
  getNode,
  sanatisePath,
  updateLastAccess,
  updateVisits,
  updateCount,
  updateCountValue,
  updateStr,
} from "./utils/firebaseutils";

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
