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
  };
}

export function dispatchCourseNavProps(dispatcher, course: Course) {
  let titleProps: TitlePropsType = {
    title: course.lo.title,
    subtitle: course.lo.properties.credits,
    img: course.lo.img,
    version: "",
    tocVisible: true,
    parentVisible: true,
    parentIcon: getIconFromType("programHome"),
    parentTip: "To programme home ...",
    parentLink: `#/${course.lo.properties.parent}`,
  };
  dispatcher("routeEvent", titleProps);
}

export function dispatchTopicNavProps(dispatcher, course: Course, topic: Topic) {
  let titleProps: TitlePropsType = {
    title: topic.lo.title,
    subtitle: course.lo.title,
    img: topic.lo.img,
    version: "",
    tocVisible: true,
    parentVisible: true,
    parentIcon: getIconFromType("moduleHome"),
    parentTip: "To module home ...",
    parentLink: `#/course/${course.url}`,
  };
  dispatcher("routeEvent", titleProps);
}

export function dispatchTalkNavProps(dispatcher, course: Course, lo: Lo) {
  let titleProps: TitlePropsType = {
    title: lo.title,
    subtitle: course.lo.title,
    img: lo.img,
    version: "",
    tocVisible: true,
    parentVisible: true,
    parentIcon: getIconFromType("topic"),
    parentTip: "To parent topic...",
    parentLink: lo.parent.lo.route,
  };
  dispatcher("routeEvent", titleProps);
}
