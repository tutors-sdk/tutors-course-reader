import type { Course } from "../../services/course";
import type { Topic } from "../../services/topic";
import { getIconFromType } from "../iconography/icons";
import type { Lo } from "../../services/lo";
export interface TitlePropsType {
  title: string;
  subtitle: string;
  img: string;
  version: string;
  tocVisible: boolean;
  parentVisible: boolean;
  parentLink: string;
  parentIcon: string;
  parentTip: string;
  companions: [];
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
    companions: [],
  };
}

export function getDefaultTitleProps(): TitlePropsType {
  return {
    title: "Default",
    subtitle: "",
    img: "",
    version: "",
    tocVisible: true,
    parentVisible: false,
    parentLink: "",
    parentIcon: "",
    parentTip: "",
    companions: [],
  };
}

export function dispatchCourseNavProps(dispatcher, course: Course) {
  dispatcher("routeEvent", getCouseTitleProps(course));
}

export function dispatchTopicNavProps(dispatcher, course: Course, topic: Topic) {
  let titleProps = getCouseTitleProps(course);
  titleProps.title = topic.lo.title;
  titleProps.subtitle = course.lo.title;
  titleProps.img = topic.lo.img;
  titleProps.parentIcon = getIconFromType("moduleHome");
  titleProps.parentTip = "To module home ...";
  titleProps.parentLink = `#/course/${course.url}`;
  dispatcher("routeEvent", titleProps);
}

export function dispatchTalkNavProps(dispatcher, course: Course, lo: Lo) {
  let titleProps = getCouseTitleProps(course);
  titleProps.title = lo.title;
  titleProps.subtitle = course.lo.title;
  titleProps.img = lo.img;
  titleProps.parentIcon = getIconFromType("topic");
  titleProps.parentTip = "To parent topic...";
  titleProps.parentLink = lo.parent.lo.route;
  dispatcher("routeEvent", titleProps);
}

export function dispatchLabNavProps(dispatcher, course: Course, lo: Lo) {
  let titleProps = getCouseTitleProps(course);
  titleProps.title = lo.title;
  titleProps.subtitle = course.lo.title;
  titleProps.img = lo.img;
  titleProps.parentIcon = getIconFromType("topic");
  titleProps.parentTip = "To parent topic...";
  titleProps.parentLink = lo.parent.lo.route;
  titleProps.tocVisible = false;
  dispatcher("routeEvent", titleProps);
}
