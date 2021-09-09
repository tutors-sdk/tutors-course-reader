import { FluentIconLib } from "./support/fluent-icons";
import { currentCourse } from "../../services/course/stores";
import { HeroIconLib } from "./support/hero-icons";

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

export const themes = ["tutors", "tutors-dark", "black", "lofi", "pastel", "cyberpunk", "dracula"];

const themeIcons = {
  "tutors": FluentIconLib,
  "tutors-dark": FluentIconLib,
  "black": FluentIconLib,
  "lofi": HeroIconLib,
  "pastel": FluentIconLib,
  "cyberpunk": FluentIconLib,
  "dracula": FluentIconLib
};

const htmlTag = document.getElementsByTagName("html")[0];

export function applyInitialTheme() {
  const theme = window.localStorage.getItem("site-theme");
  console.log("setting theme to ", theme);
  if (theme != null) {
    const htmlTag = document.getElementsByTagName("html")[0];
    htmlTag.setAttribute("data-theme", theme);
    setIconLib(themeIcons[theme]);
  } else if (theme === null) {
    const htmlTag = document.getElementsByTagName("html")[0];
    htmlTag.setAttribute("data-theme", "tutors");
    setIconLib(themeIcons["tutors"]);
  }
}

export function setTheme(currentTheme) {
  htmlTag.setAttribute("data-theme", currentTheme);
  window.localStorage.setItem("site-theme", currentTheme);
  setIconLib(themeIcons[currentTheme]);
  console.log("setting theme to ", currentTheme);
}



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

export let currentIconLib: any = StandardIconLib;

currentCourse.subscribe(course => {
  if (course && course.lo && course.lo.properties.iconset) {
    currentIconLib = course.lo.properties.iconset;
  } else {
    currentIconLib = StandardIconLib;
  }
});
