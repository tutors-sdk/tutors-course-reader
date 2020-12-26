<script lang="ts">
  import { setContext } from "svelte";
  import { fade, fly } from "svelte/transition";
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
  import AllCourses from "./pages/AllCourses.svelte";
  import NotFound from "./pages/support/NotFound.svelte";
  import MainNavigator from "./components/navigators/MainNavigator.svelte";
  import Logout from "./pages/support/Logout.svelte";
  import { Cache } from "./services/course/cache";
  import { handleAuthentication } from "./services/analytics/auth-service";
  import { AnalyticsService } from "./services/analytics/analytics-service";
  import { onMount } from "svelte";
  import { MetricsService } from "./services/analytics/metrics-service";
  import Search from "./pages/Search.svelte";
  import Modal from 'svelte-simple-modal';

  setContext("cache", new Cache());
  setContext ("metrics", new MetricsService())
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
    "/search/*" : Search,
    "/all/" : AllCourses,
    "*": NotFound,
  };
</script>

<div class="antialiased bg-gray-50 text-gray-900 font-sans h-screen">
  <Modal>
    <header class="fixed top-0 w-full">
      <MainNavigator />
    </header>
      <Router {routes} restoreScrollState={true} />
  </Modal>
</div>

<style global>
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';

  .tooltip .tooltip-text {
    @apply invisible p-4 absolute z-50 inline-block ml-4 text-sm w-1/6 rounded-lg bg-gray-400 text-white;
  }

  .tooltip:hover .tooltip-text {
    @apply visible;
  }

  @import 'tailwindcss/utilities';
</style>
