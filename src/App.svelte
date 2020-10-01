<script lang="ts">
  import { setContext } from "svelte";
  import Router from "svelte-spa-router";
  import { CourseRepo } from "./services/course-repo";
  import routes from "./routes";
  let courseRepo = new CourseRepo();
  const repo = { repo: courseRepo };
  setContext("courseRepo", repo);
</script>

<h1>Tutors Svelte</h1>

<ul>
  <li><a href="/">Home</a></li>
  <li><a href="#/course/wit-hdip-comp-sci-2020-web-development.netlify.app">Web Development </a></li>
  <li><a href="#/topic">Topic</a></li>
  <li><a href="#/talk">Talk</a></li>
  <li><a href="#/does/not/exist">Not found</a></li>
</ul>

<Router {routes} />
