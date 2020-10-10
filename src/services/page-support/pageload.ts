import type { AnalyticsService } from "../analytics-service";
import type { Course } from "../course";
import type { Lo } from "../lo";
import { checkAuth } from "../auth-service";
import { getIconFromType, IconNavBar } from "../../components/iconography/icons";
import { createCompanionBar, createWallBar, createProfileBar } from "./icon-bars";

interface TitlePropsType {
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

const func = () => {
  console.log("tick");
  // analytics.reportPageCount(params.wild, cache.course, cache.course.lo);
};
//setInterval(func, 30 * 1000);

export function pageLoad(
  route: string,
  course: Course,
  lo: Lo,
  analytics: AnalyticsService,
  dispatcher: any,
  isWall = false
) {
  if (isWall) {
    dispatchWallTitleProps(dispatcher, course, lo);
    return;
  }

  checkAuth(course, "course", analytics);
  analytics.reportPageLoad(route, course, lo);

  switch (lo.type) {
    case "course":
      dispatcher("routeEvent", getCouseTitleProps(course));
      break;
    case "lab":
      dispatchLabTitleProps(dispatcher, course, lo);
      break;
    case "topic":
      dispatchTopicTitleProps(dispatcher, course, lo);
      break;
    case "talk":
    case "video":
      dispatchTalkOrVideoTitleProps(dispatcher, course, lo);
      break;
    case "wall":
      dispatchWallTitleProps(dispatcher, course, lo);
  }
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

function getCouseTitleProps(course: Course): TitlePropsType {
  return {
    title: course.lo.title,
    subtitle: course.lo.properties.credits,
    img: course.lo.img,
    version: "",
    tocVisible: true,
    parentVisible: course.lo.properties.parent != null,
    parentIcon: getIconFromType("programHome"),
    parentTip: "To programme home ...",
    parentLink: `#/${course.lo.properties.parent}`,
    parentTarget: "_blank",
    companions: createCompanionBar(course),
    walls: createWallBar(course),
    profile: createProfileBar(course),
  };
}

export function dispatchLabTitleProps(dispatcher, course: Course, lo: Lo) {
  let titleProps = getCouseTitleProps(course);
  titleProps.title = lo.title;
  titleProps.subtitle = course.lo.title;
  titleProps.img = lo.img;
  titleProps.parentVisible = true;
  titleProps.parentIcon = getIconFromType("topic");
  titleProps.parentTip = "To parent topic...";
  titleProps.parentLink = lo.parent.lo.route;
  titleProps.tocVisible = false;
  titleProps.parentTarget = "";
  dispatcher("routeEvent", titleProps);
}

function dispatchTopicTitleProps(dispatcher, course: Course, lo: Lo) {
  let titleProps = getCouseTitleProps(course);
  titleProps.title = lo.title;
  titleProps.subtitle = course.lo.title;
  titleProps.img = lo.img;
  titleProps.parentVisible = true;
  titleProps.parentIcon = getIconFromType("moduleHome");
  titleProps.parentTip = "To module home ...";
  titleProps.parentLink = `#/course/${course.url}`;
  titleProps.parentTarget = "";
  dispatcher("routeEvent", titleProps);
}

export function dispatchTalkOrVideoTitleProps(dispatcher, course: Course, lo: Lo) {
  let titleProps = getCouseTitleProps(course);
  titleProps.title = lo.title;
  titleProps.subtitle = course.lo.title;
  titleProps.img = lo.img;
  titleProps.parentVisible = true;
  titleProps.parentIcon = getIconFromType("topic");
  titleProps.parentTip = "To parent topic...";
  titleProps.parentLink = lo.parent.lo.route;
  titleProps.parentTarget = "";
  dispatcher("routeEvent", titleProps);
}

function dispatchWallTitleProps(dispatcher, course: Course, lo: Lo) {
  let titleProps = getCouseTitleProps(course);
  titleProps.title = `All ${lo.type}'s in Module`;
  titleProps.subtitle = course.lo.title;
  titleProps.parentVisible = true;
  titleProps.parentIcon = getIconFromType("moduleHome");
  titleProps.parentTip = "To module home ...";
  titleProps.parentLink = `#/course/${course.url}`;
  titleProps.parentTarget = "";
  dispatcher("routeEvent", titleProps);
}
