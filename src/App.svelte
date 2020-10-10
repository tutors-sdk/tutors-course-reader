<script lang="ts">
  import { setContext } from "svelte";
  import Router from "svelte-spa-router";
  import Sidebar from "./pages/Sidebar.svelte";
  import Blank from "./pages/Blank.svelte";
  import Course from "./pages/Course.svelte";
  import Topic from "./pages/Topic.svelte";
  import Talk from "./pages/Talk.svelte";
  import Video from "./pages/Video.svelte";
  import Wall from "./pages/Wall.svelte";
  import Lab from "./pages/Lab.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import MainNavigator from "./pages/MainNavigator.svelte";
  import Logout from "./pages/Logout.svelte";
  import { Cache } from "./services/cache";
  import { getDefaultTitleProps } from "./services/page-support/pageload";
  import { handleAuthentication } from "./services/auth-service";
  import { AnalyticsService } from "./services/analytics-service";
  import { onMount } from "svelte";

  setContext("cache", new Cache());
  const analytics = new AnalyticsService();
  setContext("analytics", analytics);

  onMount(async () => {
    const path = document.location.href;
    if (path.includes("access_token")) {
      const token = path.substring(path.indexOf("#") + 1);
      handleAuthentication(token, analytics);
    }
  });

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
    "/wall/*": Wall,
    "/authorize/": Blank,
    "/logout": Logout,
    "*": NotFound,
  };
</script>

<MainNavigator bind:revealSidebar {titleProps} />
<Router {routes} on:routeEvent={routeEvent} />
<Sidebar bind:show={revealSidebar} />
