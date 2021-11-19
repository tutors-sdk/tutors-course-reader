import { FluentIconLib } from "tutors-reader-lib/src/icons/fluent-icons";
import { currentCourse } from "../../stores";
import { HeroIconLib } from "tutors-reader-lib/src/icons/hero-icons";
import { HalloweenIconLib } from "tutors-reader-lib/src/icons/halloween-icons";
import type { IconType } from "tutors-reader-lib/src/icons/icon-types";

let StandardIconLib = FluentIconLib;

export function setIconLib(iconLib: any) {
  StandardIconLib = iconLib;
}

export const themes = ["tutors", "tutors-dark", "tutors-dyslexia", "black", "lofi", "wireframe", "cyberpunk", "dracula"];

export const themeIcons = {
  "tutors": FluentIconLib,
  "tutors-dark": FluentIconLib,
  "tutors-dyslexia": FluentIconLib,
  "black": FluentIconLib,
  "lofi": HeroIconLib,
  "cyberpunk": FluentIconLib,
  "wireframe": FluentIconLib,
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

export let currentIconLib: any = StandardIconLib;

currentCourse.subscribe(course => {
  if (course && course.lo && course.lo.properties.iconset) {
    currentIconLib = course.lo.properties.iconset;
  } else {
    currentIconLib = StandardIconLib;
  }
});
