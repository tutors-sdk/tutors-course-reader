<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import { setupRepo } from "./repo";
  setupRepo();
</script>

<!-- <ul>
  <li><a href="/">Home</a></li>
  <li><a href="#/course/wit-hdip-comp-sci-2020-web-development.netlify.app">Web Development </a></li>
  <li><a href="#/topic">Topic</a></li>
  <li><a href="#/talk">Talk</a></li>
  <li><a href="#/does/not/exist">Not found</a></li>
</ul> -->

<Router {routes} />
