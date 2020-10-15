import type { AnalyticsService } from "../analytics-service";
import type { Course } from "../course";
import type { Lo } from "../lo";
import { checkAuth } from "../auth-service";
import { writable } from "svelte/store";

export const title = writable("");
export const subTitle = writable("");
export const img = writable("");
export const version = writable("");
export const tocVisible = writable(true);
export const parent = writable({ visible: true, link: "", icon: "", tip: "" });
export const companions = writable({ show: false, bar: [] });
export const walls = writable({ show: false, bar: [] });
export const profile = writable({ show: false, bar: [] });

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

export function pageLoad(route: string, course: Course, lo: Lo, analytics: AnalyticsService) {
  currentAnalytics = analytics;
  currentCourse = course;
  currentRoute = route;
  currentLo = lo;
  if (course.authLevel > 0 && lo.type != "course") {
    checkAuth(course, "course", analytics);
  }
  analytics.reportPageLoad(route, course, lo);
}
