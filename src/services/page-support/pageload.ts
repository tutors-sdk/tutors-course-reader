import type { AnalyticsService } from "../analytics-service";
import type { Course } from "../course";
import type { Lo } from "../lo";
import { checkAuth } from "../auth-service";
import { createCompanionBar, createWallBar, createProfileBar } from "./icon-bars";
import { writable } from "svelte/store";

export const title = writable("");
export const subTitle = writable("");
export const img = writable("");
export const version = writable("");
export const tocVisible = writable(true);
export const parentVisible = writable(true);
export const parentIcon = writable("");
export const parentLink = writable("");
export const parentTip = writable("");
export const companions = writable({ show: false, bar: [] });
export const walls = writable({ show: false, bar: [] });
export const profile = writable({ show: false, bar: [] });
const currentVersion = "2.0.0";

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

export function pageLoad(
  route: string,
  course: Course,
  lo: Lo,
  analytics: AnalyticsService,
  isWall = false
) {
  currentAnalytics = analytics;
  currentCourse = course;
  currentRoute = route;
  currentLo = lo;
  if (course.authLevel > 0 && lo.type != "course") {
    checkAuth(course, "course", analytics);
  }
  analytics.reportPageLoad(route, course, lo);
  propagateTitleProps(course, lo, isWall);
}

function propagateTitleProps(course: Course, lo: Lo, isWall = false) {
  if (isWall) {
    setWallTitleProps(course, lo);
    return;
  } else {
    switch (lo.type) {
      case "course":
         setCourseTitleProps(course);
        break;
      case "topic":
          setTopicTitleProps(course, lo);
          break;
      case "lab":
        setLabTitleProps( course, lo);
        break;
      case "talk":
      case "video":
        setTalkOrVideoTitleProps(, course, lo);
        break;
      case "wall":
        setWallTitleProps( course, lo);
        break;
    }
  }
}

function setCourseTitleProps(course: Course) {
  title.set(course.lo.title);
  subTitle.set(course.lo.properties.credits);
  img.set(course.lo.img);
  version.set(`${currentVersion} (${course.lo.version})`);
  tocVisible.set(true);
  parentVisible.set(course.lo.properties.parent != null);
  parentIcon.set("programHome");
  parentLink.set(`#/${course.lo.properties.parent}`);
  parentTip.set("To programme home ...");
  companions.set(createCompanionBar(course));
  walls.set(createWallBar(course));
  profile.set(createProfileBar(course));
}

function setTopicTitleProps(course: Course, lo: Lo) {
  setCourseTitleProps(course);
  title.set(lo.title);
  subTitle.set(course.lo.title);
  img.set(lo.img);
  parentVisible.set(true);
  parentIcon.set("moduleHome");
  parentLink.set(`#/course/${course.url}`);
  parentTip.set("To module home ...");
}

export function setLabTitleProps( course: Course, lo: Lo) {
  setCourseTitleProps(course);
  title.set(lo.title);
  subTitle.set(course.lo.title);
  img.set(lo.img);
  tocVisible.set(false);
  parentVisible.set(true);
  parentIcon.set("topic");
  parentLink.set(lo.parent.lo.route);
  parentTip.set("To parent topic ...");
}

export function setTalkOrVideoTitleProps(course: Course, lo: Lo) {
  setCourseTitleProps(course);
  title.set(lo.title);
  subTitle.set(course.lo.title);
  img.set(lo.img);
  parentVisible.set(true);
  parentIcon.set("topic");
  parentLink.set(lo.parent.lo.route);
  parentTip.set("To parent topic...");
}

function setWallTitleProps(course: Course, lo: Lo) {
  setCourseTitleProps(course);
  title.set(`All ${lo.type}'s in Module`);
  subTitle.set(course.lo.title);
  parentVisible.set(true);
  parentIcon.set("moduleHome");
  parentLink.set(`#/course/${course.url}`);
  parentTip.set("To module home ...");
}
