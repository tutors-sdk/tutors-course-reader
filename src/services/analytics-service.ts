import * as firebase from "firebase/app";
import "firebase/database";
import type { Lo } from "./lo";
import type { Course } from "./course";
import type { User } from "./auth-service";
import { getKeys } from "../environment";
import { sanatisePath, updateCount, updateStr } from "./utils/firebaseutils";

export class AnalyticsService {
  courseBaseName = "";
  userEmail = "";
  userEmailSanitised = "";
  userId = "";
  firebaseIdRoot = "";
  firebaseEmailRoot = "";
  url = "";

  constructor() {
    firebase.initializeApp(getKeys().firebase);
  }

  reportLogin(user: User, url: string) {
    if (this.userEmail !== user.email || this.url !== url) {
      this.url = url;
      this.courseBaseName = url.substr(0, url.indexOf("."));
      this.userEmail = user.email;
      this.userId = user.userId;
      this.firebaseIdRoot = `${this.courseBaseName}/usage`;
      this.userEmailSanitised = user.email.replace(/[`#$.\[\]\/]/gi, "*");
      this.firebaseEmailRoot = `${this.courseBaseName}/users/${this.userEmailSanitised}`;
      this.updateLogin(user);
    }
  }

  reportPageLoad(path: string, course: Course, lo: Lo) {
    if (this.userEmail) {
      let node = "";
      if (lo.type !== "course") {
        node = sanatisePath(course.url, path);
      }
      this.updateLastAccess(node, lo.title);
      this.updateVisits(node, lo.title);
    }
  }

  reportPageCount(path: string, course: Course, lo: Lo) {
    if (this.userEmail) {
      let node = "";
      if (lo.type !== "course") {
        node = sanatisePath(course.url, path);
      }
      this.updateLastAccess(node, lo.title);
      this.updateCount(node, lo.title);
    }
  }

  updateLastAccess(key: string, title: string) {
    updateStr(`${this.firebaseIdRoot}/${key}/last`, new Date().toLocaleString());
    updateStr(`${this.firebaseIdRoot}/${key}/title`, title);
    updateStr(`${this.firebaseEmailRoot}/${key}/last`, new Date().toLocaleString());
    updateStr(`${this.firebaseEmailRoot}/${key}/title`, title);
  }

  updateVisits(key: string, title: string) {
    updateCount(`${this.firebaseIdRoot}/${key}/visits`);
    updateCount(`${this.firebaseEmailRoot}/${key}/visits`);
  }

  updateCount(key: string, title: string) {
    updateCount(`${this.firebaseIdRoot}/${key}/count`);
    updateCount(`${this.firebaseEmailRoot}/${key}/count`);
  }

  updateLogin(user: User) {
    updateStr(`${this.firebaseEmailRoot}/email`, user.email);
    updateStr(`${this.firebaseEmailRoot}/name`, user.name);
    updateStr(`${this.firebaseEmailRoot}/id`, user.userId);
    updateStr(`${this.firebaseEmailRoot}/nickname`, user.nickname);
    updateStr(`${this.firebaseEmailRoot}/picture`, user.picture);
    updateStr(`${this.firebaseEmailRoot}/last`, new Date().toString());
    updateCount(`${this.firebaseEmailRoot}/count`);
  }
}
