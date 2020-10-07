import type { Course } from "../../services/course";
import { getIconFromType } from "../iconography/icons";

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
