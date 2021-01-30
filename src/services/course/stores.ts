import { writable } from "svelte/store";
import type { WeekType } from "./lo";

const navigator = {
  title: {
    title: "",
    subTitle: "",
    img: "",
  },
  parent: {
    show: false,
    link: "",
    icon: "",
    tip: "",
  },
};

const weekType: WeekType = {
  title: "",
  type: "",
  date: "",
  dateObj: null,
};

export const navigatorProps = writable(navigator);
export const revealSidebar = writable(false);
export const profile = writable({ show: false, bar: [] });
export const week = writable(weekType);
export const courseUrl = writable("");
export const currentCourse = writable(null);
export const studentsOnline = writable(0);
export const live = writable(false);
