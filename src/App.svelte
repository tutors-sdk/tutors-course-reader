<script lang="ts">
  import { setContext } from "svelte";
  import Router from "svelte-spa-router";
  import Sidebar from "./components/navigators/Sidebar.svelte";
  import Blank from "./pages/support/Blank.svelte";
  import Course from "./pages/Course.svelte";
  import Topic from "./pages/Topic.svelte";
  import Talk from "./pages/Talk.svelte";
  import Video from "./pages/Video.svelte";
  import Wall from "./pages/Wall.svelte";
  import Lab from "./pages/Lab.svelte";
  import Time from "./pages/Time.svelte"
  import NotFound from "./pages/support/NotFound.svelte";
  import MainNavigator from "./components/navigators/MainNavigator.svelte";
  import Logout from "./pages/support/Logout.svelte";
  import { Cache } from "./services/course/cache";
  import { handleAuthentication } from "./services/analytics/auth-service";
  import { AnalyticsService } from "./services/analytics/analytics-service";
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
    "/time/*" : Time,
    "*": NotFound,
  };
</script>

<MainNavigator />
<Router {routes} />
<Sidebar />
