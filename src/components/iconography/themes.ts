import { FluentIconLib } from "./support/fluent-icons";
import { currentCourse } from "../../services/course/stores";
import { HeroIconLib } from "./support/hero-icons";
import { HalloweenIconLib } from "./support/halloween-icons";

let StandardIconLib = FluentIconLib;

export function setIconLib(iconLib: any) {
  StandardIconLib = iconLib;
}

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

export const themes = ["tutors", "tutors-dark", "tutors-dyslexia", "black", "lofi", "pastel", "cyberpunk", "dracula"];

export const themeIcons = {
  "tutors": FluentIconLib,
  "tutors-dark": FluentIconLib,
  "tutors-dyslexia": FluentIconLib,
  "black": FluentIconLib,
  "lofi": HeroIconLib,
  "pastel": FluentIconLib,
  "cyberpunk": FluentIconLib,
  "dracula": HalloweenIconLib,
};

export function getIcon(type: string): IconType {
  let icon: IconType = StandardIconLib.default;
  if (currentIconLib[type]) {
    icon = currentIconLib[type];
  } else {
    if (StandardIconLib[type]) {
      icon = StandardIconLib[type];
    }
  }
  return icon;
}

export function getColour(type: string): IconType {
  let icon: IconType = StandardIconLib.default;
  if (currentIconLib[type]) {
    icon = currentIconLib[type];
  } else {
    if (StandardIconLib[type]) {
      icon = StandardIconLib[type];
    }
  }
  return icon.colour;
}

export let currentIconLib: any = StandardIconLib;

currentCourse.subscribe(course => {
  if (course && course.lo && course.lo.properties.iconset) {
    currentIconLib = course.lo.properties.iconset;
  } else {
    currentIconLib = StandardIconLib;
  }
});
