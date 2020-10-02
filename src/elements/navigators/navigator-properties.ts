const readerVersion = "0.1";
import type { Course } from "../../services/course";

interface Properties {
  [key: string]: any;
}

export class NavigatorProperties {
  version = "hello";
  toc = {
    visible: true,
  };

  titleCard = {
    title: "",
    subtitle: "",
    img: "",
    version: "",
    visible: true,
  };

  parent = {
    link: "",
    icon: "",
    tip: "",
    visible: true,
  };

  companions = {
    nav: [],
    visible: true,
  };

  walls = {
    nav: [],
    visible: true,
  };

  profile = {
    nav: [],
    visible: false,
  };

  url = "";

  constructor() {}

  courseUrl: string;
  isPortfolio = false;

  config(navBars, params) {
    this.titleCard.visible = navBars.titleCard;
    this.parent.visible = navBars.parent;
    this.companions.visible = navBars.companions;
    this.walls.visible = navBars.walls;

    this.profile.visible = navBars.profile;
    this.toc.visible = navBars.toc;

    this.titleCard.title = params.title;
    this.titleCard.subtitle = params.subtitle;
    this.titleCard.img = params.img;
    this.parent.link = params.parentLink;
    this.parent.icon = params.parentIcon;
    this.parent.tip = params.parentTip;
  }

  init(course: Course) {
    this.isPortfolio = course.isPortfolio();
    this.version = `${readerVersion} (${course.lo.version})`;
    if (course.url !== this.url) {
      this.url = course.url;
      this.createWallBar(course);
      this.createCompanionBar(course.lo.properties);
      if (course.authLevel > 0) {
        this.createProfileBar(course.isPortfolio());
      }
    }
  }

  clear() {
    this.companions.nav = this.profile.nav = this.walls.nav = this.companions.nav = [];
  }

  createWallBar(course: Course) {
    this.walls.nav = [];
    course.walls.forEach((los, type) => {
      this.walls.nav.push(this.createWallLink(type));
    });
    this.walls.nav.push({
      link: `search/${this.url}`,
      icon: "search",
      tip: "Search this course",
    });
  }

  createCompanionBar(properties: Properties) {
    this.companions.nav = [];
    if (properties.slack)
      this.companions.nav.push({
        link: properties["slack"],
        icon: "slack",
        target: "_blank",
        tip: "to slack channel for this module",
      });
    if (properties.zoom)
      this.companions.nav.push({
        link: properties["zoom"],
        icon: "zoom",
        tip: "to zoom meeting for this module",
        target: "_blank",
      });
    if (properties.moodle)
      this.companions.nav.push({
        link: properties["moodle"],
        icon: "moodle",
        target: "_blank",
        tip: "to moodle module for this module",
      });
    if (properties.youtube)
      this.companions.nav.push({
        link: properties["youtube"],
        icon: "youtube",
        target: "_blank",
        tip: "to youtube channel for this module",
      });

    this.companions.visible = this.companions.nav.length > 0;
  }

  createWallLink(type: string) {
    return {
      link: `${type}s/${this.url}`,
      icon: type,
      tip: `all ${type}'s in this module`,
    };
  }

  statusUpdate(status: string): void {}
  logout(): void {}

  initProfile() {}
  createProfileBar(isPortfolio: boolean) {}
}
