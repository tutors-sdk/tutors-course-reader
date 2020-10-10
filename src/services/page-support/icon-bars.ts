import { isAuthenticated, getUserId } from "../auth-service";
import type { Course } from "../course";
import type { IconNavBar } from "../../components/iconography/icons";

export function createCompanionBar(course: Course): IconNavBar {
  const navBar = {
    bar: [],
    show: true,
  };
  const properties = course.lo.properties;
  if (properties.slack)
    navBar.bar.push({
      link: properties["slack"],
      icon: "slack",
      target: "_blank",
      tip: "to slack channel for this module",
    });
  if (properties.zoom)
    navBar.bar.push({
      link: properties["zoom"],
      icon: "zoom",
      tip: "to zoom meeting for this module",
      target: "_blank",
    });
  if (properties.moodle)
    navBar.bar.push({
      link: properties["moodle"],
      icon: "moodle",
      target: "_blank",
      tip: "to moodle module for this module",
    });
  if (properties.youtube)
    navBar.bar.push({
      link: properties["youtube"],
      icon: "youtube",
      target: "_blank",
      tip: "to youtube channel for this module",
    });
  navBar.show = navBar.bar.length > 0;
  return navBar;
}

export function createWallBar(course: Course): IconNavBar {
  const navBar = {
    bar: [],
    show: true,
  };
  course.walls.forEach((los, type) => {
    navBar.bar.push(createWallLink(type, course.url));
  });
  return navBar;
}

export function createWallLink(type: string, url: string) {
  return {
    link: `/#/wall/${type}/${url}`,
    icon: type,
    tip: `all ${type}'s in this module`,
  };
}

export function createProfileBar(course: Course): IconNavBar {
  const navBar = {
    bar: [],
    show: false,
  };
  if (isAuthenticated()) {
    navBar.show = true;
    navBar.bar.push({
      link: `https://tutors-metrics.netlify.app/time/${course.url}/${getUserId()}}`,
      icon: "tutorsTime",
      tip: "Tutors Time",
      target: "_blank",
    });
    navBar.bar.push({
      link: `https://tutors-metrics.netlify.app/live/${course.url}`,
      icon: "timeLive",
      tip: "See who is doing labs right now",
      target: "_blank",
    });
    navBar.bar.push({ link: `/#/logout`, icon: "logout", tip: "Logout form Tutors" });
  }
  return navBar;
}
