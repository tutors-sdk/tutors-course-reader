<script lang="ts">
  import { setContext } from "svelte";
  import Router from "svelte-spa-router";
  import Sidebar from "./routes/Sidebar.svelte";

  import MainNavigator from "./elements/navigators/MainNavigator.svelte";
  import Blank from "./routes/Blank.svelte";
  import Course from "./routes/Course.svelte";
  import Topic from "./routes/Topic.svelte";
  import Talk from "./routes/Talk.svelte";
  import Video from "./routes/Video.svelte";
  import NotFound from "./routes/NotFound.svelte";

  import { getDefaultTitleProps } from "./elements/navigators/navigator-properties";
  import { CourseRepo } from "./services/course-repo";
  import Lab from "./routes/Lab.svelte";

  setContext("courseRepo", new CourseRepo());

  let titleProps = getDefaultTitleProps();
  function routeEvent(event) {
    titleProps = event.detail;
  }
  let routes = {
    "/": Blank,
    "/course/*": Course,
    "/topic/*": Topic,
    "/talk/*": Talk,
    "/video/*": Video,
    "/lab/*": Lab,
    "*": NotFound,
  };

  let sidebar_show = false;
</script>

<MainNavigator {titleProps} />
<button on:click={() => (sidebar_show = !sidebar_show)}>Toggle Sidebar</button>
<Router {routes} on:routeEvent={routeEvent} />
<Sidebar bind:show={sidebar_show} />
