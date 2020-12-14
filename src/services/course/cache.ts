import { Course } from "./course";
import path from "path-browserify";
import { lastSegment } from "../utils/utils";
import { Lab } from "./lab";
import { profile } from "../course/stores";
import { createProfileBar } from "../analytics/auth-service";
import { courseUrl } from "./stores";

export class Cache {
  course: Course;
  privelaged = false;
  courses = new Map<string, Course>();
  courseUrl = "";

  constructor() {}

  async getCourse(url) {
    let loadError = false;
    if (!this.course || this.course.url !== url) {
      this.courseUrl = url;
      this.course = this.courses.get(url);
      if (!this.course) {
        this.course = new Course(url);
        try {
          await this.course.fetchCourse();
          this.courses.set(url, this.course);
          courseUrl.set(url);
        } catch (e) {
          this.courseUrl = "";
          this.course = null;
          loadError = true;
        }
      }
      if (!loadError) profile.set(createProfileBar(this.course.url));
    }
  }

  async fetchCourse(url: string) {
    await this.getCourse(url);
    return this.course;
  }

  async fetchTopic(url: string) {
    await this.fetchCourse(path.dirname(url));
    return this.course.topicIndex.get(lastSegment(url));
  }

  async fetchCourseFromTalk(url: string) {
    url = url.substring(0, url.indexOf("/"));
    await this.fetchCourse(url);
    return this.course;
  }

  async fetchWall(url: string) {
    const path = url.split("/");
    await this.fetchCourse(path[1]);
    return this.course.walls.get(path[0]);
  }

  async fetchLab(url: string) {
    let courseUrl = url.substring(0, url.indexOf("/"));
    await this.fetchCourse(courseUrl);
    let labId = `/#/lab/${url}`;
    const lastSegment = url.substr(url.lastIndexOf("/") + 1);
    if (!lastSegment.startsWith("book")) {
      url = url.substr(0, url.lastIndexOf("/"));
      labId = `/#/lab/${url}`;
    }
    const lo = this.course.labIndex.get(labId);
    const lab = new Lab(lo, url);
    return lab;
  }
}
