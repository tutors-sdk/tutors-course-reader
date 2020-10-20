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

export const tocVisible = writable(true);
export const titleProps = writable({ title: "", subTitle: "", img: "" });
export const version = writable("");
export const parent = writable({ visible: true, link: "", icon: "", tip: "" });
export const companions = writable({ show: false, bar: [] });
export const wallBar = writable({ show: false, bar: [] });
export const profile = writable({ show: false, bar: [] });

export const revealSidebar = writable(false);
