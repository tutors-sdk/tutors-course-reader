import { writable } from "svelte/store";

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
};

export const navigatorProps = writable(navigator);
export const revealSidebar = writable(false);
export const profile = writable({ show: false, bar: [] });
