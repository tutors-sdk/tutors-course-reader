import { getKeys } from "../../environment";
import type { User } from "./auth-service";
import type { Lo } from "../course/lo";
import type { Course } from "../course/course";
import { initGTag, trackEvent, trackTag } from "./utils-ga";

export class GoogleAnalytics {
  courseBaseName = "";
  userEmail = "";
  userId = "";
  url = "";

  constructor() {
    initGTag(getKeys().ga);
  }

  login(user: User, url: string) {
    if (this.userEmail !== user.email || this.url !== url) {
      this.url = url;
      this.courseBaseName = url.substr(0, url.indexOf("."));
      this.userEmail = user.email;
      this.userId = user.userId;
    }
  }

  reportPageLoad(path: string, course: Course, lo: Lo) {
    this.courseBaseName = course.url.substr(0, course.url.indexOf("."));
    const title = analyicsPageTitle(this.courseBaseName, course, lo);

    trackTag(getKeys().ga, path, title, this.userId);
    trackEvent(getKeys().ga, this.courseBaseName, path, lo, this.userId);
  }
}

export function analyicsPageTitle(courseId: string, course: Course, lo: Lo) {
  let title = `${courseId} : ${course.lo.title} : `;
  if (lo.parent) {
    title += `${lo.parent.lo.title} : ${lo.title}`;
  } else {
    title += ` ${lo.title}`;
  }
  return title;
}
