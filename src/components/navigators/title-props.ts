import { isAuthenticated, getUserId } from "./../../services/auth-service";
import type { Course } from "../../services/course";
import { getIconFromType, IconNavBar } from "../iconography/icons";
import { getContext } from "svelte";
export interface TitlePropsType {
  title: string;
  subtitle: string;
  img: string;
  version: string;
  tocVisible: boolean;
  parentVisible: boolean;
  parentLink: string;
  parentTarget: string;
  parentIcon: string;
  parentTip: string;
  companions: IconNavBar;
  walls: IconNavBar;
  profile: IconNavBar;
}

export function getCouseTitleProps(course: Course): TitlePropsType {
  return {
    title: course.lo.title,
    subtitle: course.lo.properties.credits,
    img: course.lo.img,
    version: "",
    tocVisible: true,
    parentVisible: true,
    parentIcon: getIconFromType("programHome"),
    parentTip: "To programme home ...",
    parentLink: `#/${course.lo.properties.parent}`,
    parentTarget: "_blank",
    companions: createCompanionBar(course),
    walls: createWallBar(course),
    profile: createProfileBar(course),
  };
}

export function getDefaultTitleProps(): TitlePropsType {
  return {
    title: "",
    subtitle: "",
    img: "",
    version: "",
    tocVisible: true,
    parentVisible: false,
    parentLink: "",
    parentTarget: "",
    parentIcon: "",
    parentTip: "",
    companions: { show: false, bar: [] },
    walls: { show: false, bar: [] },
    profile: { show: false, bar: [] },
  };
}

function createCompanionBar(course: Course): IconNavBar {
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

function createWallBar(course: Course): IconNavBar {
  const navBar = {
    bar: [],
    show: true,
  };
  course.walls.forEach((los, type) => {
    navBar.bar.push(createWallLink(type, course.url));
  });
  return navBar;
}

function createWallLink(type: string, url: string) {
  return {
    link: `/#/wall/${type}/${url}`,
    icon: type,
    tip: `all ${type}'s in this module`,
  };
}

function createProfileBar(course: Course): IconNavBar {
  const navBar = {
    bar: [],
    show: true,
  };
  if (isAuthenticated()) {
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
