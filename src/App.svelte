<script lang="ts">
  import { setContext } from "svelte";
  import Router from "svelte-spa-router";
  import { location, replace } from "svelte-spa-router";
  import Sidebar from "./pages/Sidebar.svelte";
  import Blank from "./pages/Blank.svelte";
  import Course from "./pages/Course.svelte";
  import Topic from "./pages/Topic.svelte";
  import Talk from "./pages/Talk.svelte";
  import Video from "./pages/Video.svelte";
  import Wall from "./pages/Wall.svelte";
  import Lab from "./pages/Lab.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import MainNavigator from "./components/navigators/MainNavigator.svelte";
  import { Cache } from "./services/cache";
  import { getDefaultTitleProps } from "./components/navigators/title-props";
  import { AuthService } from "./services/auth-service";

  let authService = new AuthService();
  setContext("cache", new Cache());
  setContext("auth", authService);

  import { onMount } from "svelte";

  onMount(async () => {
    const path = document.location.href;
    if (path.includes("access_token")) {
      const token = path.substring(path.indexOf("#") + 1);
      authService.handleAuthentication(token);
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
    "*": NotFound,
  };
</script>

<MainNavigator bind:revealSidebar {titleProps} />
<Router {routes} on:routeEvent={routeEvent} />
<Sidebar bind:show={revealSidebar} />
