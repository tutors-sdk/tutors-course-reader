import { setContext, getContext } from "svelte";
import { CourseRepo } from "./services/course-repo";

export function setupRepo() {
  let courseRepo = new CourseRepo();
  const repo = { repo: courseRepo };
  setContext("courseRepo", repo);
}

export function getRepo(): CourseRepo {
  let repo: any = getContext("courseRepo");
  let courseRepo = repo.repo;
  return courseRepo;
}
