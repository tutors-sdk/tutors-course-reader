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
  import { Cache } from "./services/cache";
  import Lab from "./routes/Lab.svelte";

  setContext("cache", new Cache());

  let titleProps = getDefaultTitleProps();
  function routeEvent(event) {
    titleProps = event.detail;
  }
  let revealSidebar = false;

  let routes = {
    "/": Blank,
    "/course/*": Course,
    "/topic/*": Topic,
    "/talk/*": Talk,
    "/video/*": Video,
    "/lab/*": Lab,
    "*": NotFound,
  };
</script>

<MainNavigator bind:revealSidebar {titleProps} />
<Router {routes} on:routeEvent={routeEvent} />
<Sidebar bind:show={revealSidebar} />
