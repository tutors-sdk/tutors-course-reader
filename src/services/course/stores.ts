import { writable } from "svelte/store";
import type { WeekType } from "./lo";

const navigator = {
  tocShow: false,
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
  companions: {
    show: false,
    bar: [],
  },
  walls: {
    show: false,
    bar: [],
  },
  portfolio: false,
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
