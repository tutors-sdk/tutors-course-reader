<script lang="ts">
  import TailwindCSS from "./TailwindCSS.svelte";
  import { onMount, setContext } from "svelte";
  import Router from "svelte-spa-router";
  import Sidebar from "./components/navigators/Sidebar.svelte";
  import Blank from "./pages/support/Blank.svelte";
  import Course from "./pages/Course.svelte";
  import Topic from "./pages/Topic.svelte";
  import Talk from "./pages/Talk.svelte";
  import Video from "./pages/Video.svelte";
  import Wall from "./pages/Wall.svelte";
  import Lab from "./pages/Lab.svelte";
  import Time from "./pages/Time.svelte";
  import Live from "./pages/Live.svelte";
  import AllCourses from "./pages/AllCourses.svelte";
  import NotFound from "./pages/support/NotFound.svelte";
  import MainNavigator from "./components/navigators/MainNavigator.svelte";
  import Logout from "./pages/support/Logout.svelte";
  import TutorsTerms from "./pages/support/TutorsTerms.svelte";
  import { Cache } from "./services/course/cache";
  import { handleAuthentication } from "./services/analytics/auth-service";
  import { AnalyticsService } from "./services/analytics/analytics-service";
  import Search from "./pages/Search.svelte";
  import Modal from "svelte-simple-modal";

  setContext("cache", new Cache());
  const analytics = new AnalyticsService();
  setContext("analytics", analytics);

  let authenticating = false;
  let bg = "bg-gray-50";

  onMount(async () => {
    const path = document.location.href;
    if (path.includes("access_token")) {
      const token = path.substring(path.indexOf("#") + 1);
      handleAuthentication(token, analytics);
      authenticating = true;
    } else if (path.includes("/live")) {
       bg = "";
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
    "/time/*": Time,
    "/live/*": Live,
    "/search/*": Search,
    "/all/": AllCourses,
    "*": NotFound
  };

  if (localStorage.theme && localStorage.theme === "dark") {
    window.document.body.classList.toggle("dark");
  }
</script>
<TailwindCSS />
<div class="antialiased font-sans {bg} text-gray-900 font-sans dark:bg-gray-900 dark:text-gray-100 min-h-screen">
  {#if authenticating}
    <TutorsTerms bind:authenticating />
  {:else}
    <Modal>
      <Sidebar />
      <MainNavigator />
      <Router {routes} />
    </Modal>
  {/if}
</div>

