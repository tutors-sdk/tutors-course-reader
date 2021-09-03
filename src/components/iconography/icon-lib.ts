import { HeroIconLib } from "./hero-icons";
import { currentCourse } from "../../services/course/stores";

export interface IconType {
  icon: any;
  colour: string;
}

export interface IconNav {
  link: string;
  icon: string;
  tip: string;
  target: string;
}

export interface IconNavBar {
  show: boolean;
  bar: IconNav[];
}

export interface IconRef {
  icon: IconType;
  colour: string;
}

export function getIcon(iconLib: any, type: string): IconType {
  return iconLib[type];
}

export let currentIconLib: any = HeroIconLib;

currentCourse.subscribe(course => {
  if (course && course.lo && course.lo.properties.iconset) {
    currentIconLib = course.lo.properties.iconset;
  } else {
    currentIconLib = HeroIconLib;
  }
});


