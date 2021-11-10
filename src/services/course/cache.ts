import { Course } from "./course";
import path from "path-browserify";
import { lastSegment } from "../utils/utils";
import { Lab } from "./lab";
import { currentCourse, week } from "../course/stores";
import { courseUrl } from "./stores";
import { MetricsService } from "../analytics/metrics-service";
import { fromLocalStorage, isAuthenticated } from "../analytics/auth-service";

export class Cache {
  course: Course;
  courses = new Map<string, Course>();
  courseUrl = "";
  loadError = false;

  constructor() {
  }

  async getCourse(url) {
    if (!this.course || this.course.url !== url) {
      this.courseUrl = url;
      this.course = this.courses.get(url);
      if (!this.course) {
        this.course = new Course(url);
        try {
          await this.course.fetchCourse();
          this.courses.set(url, this.course);
          if (this.course.authLevel > 0) {
            this.course.metricsService = new MetricsService(this.course);
          }
        } catch (e) {
          this.courseUrl = "";
          this.course = null;
          this.loadError = true;
          console.log(e);
        }
      }
    }
  }

  async fetchCourse(url: string) {
    await this.getCourse(url);
    if (!this.loadError) {

      if (this.course.hasWhiteList()) {
        if (isAuthenticated()) {
          const user = fromLocalStorage();
          const student = this.course.getStudents().find(student => student.github === user.nickname);
          if (!student) {
            console.log("Not Authorised to access this course");
            return null;
          }
        }
      }

      currentCourse.set(this.course);
      week.set(this.course.currentWeek);
      courseUrl.set(url);
    }
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
    let lab = this.course.hydratedLabs.get(labId);
    if (!lab) {
      lab = new Lab(lo, url);
      this.course.hydratedLabs.set(labId, lab);
    }
    return lab;
  }
}
