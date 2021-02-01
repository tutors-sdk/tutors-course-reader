import type { Calendar, Lo, Student, WeekType } from "./lo";
import { allLos, allVideoLos, fixRoutes, getSortedUnits, injectCourseUrl } from "../utils/utils";
import { Topic } from "./topic";
import type { IconNav, IconNavBar } from "../../components/iconography/icon-lib";
import type { MetricsService } from "../analytics/metrics-service";
import { isAuthenticated } from "../analytics/auth-service";

export class Course {
  lo: Lo;
  topics: Topic[] = [];
  units: Lo[];
  standardLos: Lo[];
  allLos: Lo[];
  url: string;
  authLevel = 0;
  analytics = 0;
  topicIndex = new Map<string, Topic>();
  videos = new Map<string, Lo>();
  talks = new Map<string, Lo>();
  labIndex = new Map<string, Lo>();
  walls = new Map<string, Lo[]>();
  calendar: Calendar;
  currentWeek: WeekType = null;

  metricsService: MetricsService = null;

  companions: IconNavBar = {
    show: true,
    bar: [],
  };
  wallBar: IconNavBar = {
    show: true,
    bar: [],
  };
  profileBar: IconNavBar = {
    show: true,
    bar: [],
  };

  constructor(url: string) {
    this.url = url;
  }

  async fetchCourse() {
    this.lo = await this.fetch(this.url);
    this.allLos = this.lo.los;
    this.lo.los = this.lo.los.filter((lo) => lo.hide != true);
    this.populate();
    this.createCompanions();
    this.createWallBar();
  }

  async fetch(url: string, complete = false) {
    const response = await fetch("https://" + url + "/tutors.json");
    const lo = await response.json();
    injectCourseUrl(lo, url);
    if (lo.properties.hasOwnProperty("auth")) this.authLevel = lo.properties.auth;
    if (lo.properties.hasOwnProperty("analytics")) this.analytics = lo.properties.analytics;
    this.lo = lo;
    this.initCalendar();
    return lo;
  }

  populate() {
    for (let lo of this.lo.los) {
      const topic = new Topic(lo, this.url);
      this.topics.push(topic);
      this.topicIndex.set(lo.id, topic);
    }
    this.standardLos = this.lo.los;
    const talkLos = allLos("talk", this.lo.los);
    talkLos.forEach((lo) => {
      this.talks.set(`${lo.route}`, lo);
    });
    this.addWall("talk");

    if (!this.areVideosHidden()) {
      const videoLos = allVideoLos(this.lo.los);
      videoLos.forEach((lo) => {
        this.videos.set(`${lo.video}`, lo);
      });
      if (videoLos.length > 0) {
        this.walls.set("video", videoLos);
      }
    }

    const labLos = allLos("lab", this.lo.los);
    labLos.forEach((lo) => {
      fixRoutes(lo);
      this.labIndex.set(lo.route, lo);
    });
    if (labLos.length > 0) {
      this.walls.set("lab", labLos);
    }

    this.addWall("github");
    this.addWall("archive");

    this.units = getSortedUnits(this.lo.los);
    this.standardLos = this.lo.los.filter(
      (lo) => lo.type !== "unit" && lo.type !== "panelvideo" && lo.type !== "paneltalk"
    );
    this.createProfileBar();
  }

  addWall(type: string) {
    const los = allLos(type, this.lo.los);
    if (los.length > 0) {
      this.walls.set(type, los);
    }
  }

  showAllLos() {
    this.lo.los = this.allLos;
    this.populate();
  }

  isPortfolio() {
    let isPortfolio = false;
    if (this.lo.properties.portfolio !== undefined) {
      const portfolio: any = this.lo.properties.portfolio;
      isPortfolio = portfolio == true;
    }
    return isPortfolio;
  }

  areVideosHidden(): boolean {
    let videosHidden = false;
    if (this.lo.properties.hideVideos !== undefined) {
      const hideVideos: any = this.lo.properties.hideVideos;
      videosHidden = hideVideos == true;
    }
    return videosHidden;
  }

  hasEnrollment(): boolean {
    return this.lo.enrollment !== undefined;
  }

  getStudents(): Student[] {
    return this.lo.enrollment.students;
  }

  createCompanions() {
    const properties = this.lo.properties;
    if (properties.slack)
      this.companions.bar.push({
        link: properties["slack"],
        icon: "slack",
        target: "_blank",
        tip: "to slack channel for this module",
      });
    if (properties.zoom)
      this.companions.bar.push({
        link: properties["zoom"],
        icon: "zoom",
        tip: "to zoom meeting for this module",
        target: "_blank",
      });
    if (properties.moodle)
      this.companions.bar.push({
        link: properties["moodle"],
        icon: "moodle",
        target: "_blank",
        tip: "to moodle module for this module",
      });
    if (properties.youtube)
      this.companions.bar.push({
        link: properties["youtube"],
        icon: "youtube",
        target: "_blank",
        tip: "to youtube channel for this module",
      });
    this.companions.show = this.companions.bar.length > 0;
  }

  createProfileBar() {
    if (isAuthenticated() && this.authLevel > 0) {
      this.profileBar.show = true;
      this.profileBar.bar = [];
      this.profileBar.bar.push({
        link: `/#/time/${this.url}`,
        icon: "tutorsTime",
        tip: "Tutors Time",
        target: "",
      });
      this.profileBar.bar.push({
        link: `/#/live/${this.url}`,
        icon: "live",
        tip: "Tutors Live",
        target: "_blank",
      });
      this.profileBar.bar.push({ link: `/#/logout`, icon: "logout", tip: "Logout from Tutors", target: "" });
    }
  }

  createWallBar() {
    if (!this.isPortfolio()) {
      this.walls.forEach((los, type) => {
        this.wallBar.bar.push(this.createWallLink(type));
        this.wallBar.show = true;
      });
    }
  }

  createWallLink(type: string): IconNav {
    return {
      link: `/#/wall/${type}/${this.url}`,
      icon: type,
      tip: `all ${type}'s in this module`,
      target: "",
    };
  }

  initCalendar() {
    const calendar: Calendar = {
      title: "unknown",
      weeks: [],
    };
    this.calendar = calendar;
    try {
      if (this.lo.calendar) {
        const calendarObj = this.lo.calendar;
        calendar.title = calendarObj.title;
        for (let i = 0; i < calendarObj.weeks.length; i++) {
          const week = {
            date: Object.entries(calendarObj.weeks[i])[0][0],
            // @ts-ignore
            title: Object.entries(calendarObj.weeks[i])[0][1].title,
            // @ts-ignore
            type: Object.entries(calendarObj.weeks[i])[0][1].type,
            dateObj: new Date(Object.entries(calendarObj.weeks[i])[0][0]),
          };
          calendar.weeks.push(week);
        }
        const today = Date.now();
        for (let i = 0; i < calendar.weeks.length - 1; i++) {
          if (today > Date.parse(calendar.weeks[i].date) && today <= Date.parse(calendar.weeks[i + 1].date)) {
            this.currentWeek = calendar.weeks[i];
          }
        }
      }
    } catch (e) {
      console.log("Error loading calendar");
    }
  }
}
