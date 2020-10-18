import { writable } from "svelte/store";

export const tocVisible = writable(true);
export const titleProps = writable({ title: "", subTitle: "", img: "" });
export const version = writable("");
export const parent = writable({ visible: true, link: "", icon: "", tip: "" });
export const companions = writable({ show: false, bar: [] });
export const walls = writable({ show: false, bar: [] });
export const profile = writable({ show: false, bar: [] });
