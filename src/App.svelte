<script lang="ts">
  import "./tailwind.css";
  import { onMount, setContext } from "svelte";
  import Router from "svelte-spa-router";
  import Sidebar from "./components/navigators/Sidebar.svelte";
  import Blank from "./pages/support/Blank.svelte";
  import Unauthorised from "./pages/support/Unauthorised.svelte";
  import Course from "./pages/Course.svelte";
  import Topic from "./pages/Topic.svelte";
  import Talk from "./pages/Talk.svelte";
  import Video from "./pages/Video.svelte";
  import Wall from "./pages/Wall.svelte";
  import Lab from "./pages/Lab.svelte";
  import AllCourses from "./pages/AllCourses.svelte";
  import NotFound from "./pages/support/NotFound.svelte";
  import MainNavigator from "./components/navigators/MainNavigator.svelte";
  import Logout from "./pages/support/Logout.svelte";
  import TutorsTerms from "./pages/support/TutorsTerms.svelte";
  import { CourseService } from "./services/course-service";
  import { handleAuthentication } from "./services/auth-service";
  import { AnalyticsService } from "./services/analytics-service";
  import Search from "./pages/Search.svelte";
  import Modal from "svelte-simple-modal";
  import { setIconLib, themeIcons } from "./components/iconography/themes";
  import Infobar from "./components/navigators/Infobar.svelte";

  setContext("cache", new CourseService());
  const analytics = new AnalyticsService();
  setContext("analytics", analytics);

  let authenticating = false;
  let bg = "bg-gray-50";

  onMount(async () => {
    applyInitialTheme();
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
    "/unauthorised": Unauthorised,
    "/course/*": Course,
    "/topic/*": Topic,
    "/talk/*": Talk,
    "/video/*": Video,
    "/lab/*": Lab,
    "/wall/*": Wall,
    "/authorize/": Blank,
    "/logout": Logout,
    "/search/*": Search,
    "/all/": AllCourses,
    "*": NotFound
  };

  const htmlTag = document.getElementsByTagName("html")[0];
  let currentTheme = window.localStorage.getItem("site-theme");
  if (currentTheme === "dracula") {
    currentTheme = null;
  }
  function applyInitialTheme() {
    if (currentTheme != null) {
      htmlTag.setAttribute("data-theme", currentTheme);
      setIconLib(themeIcons[currentTheme]);
    } else if (currentTheme === null) {
      window.localStorage.setItem("site-theme", "tutors");
      window.localStorage.setItem("theme", "tutors");
      htmlTag.setAttribute("data-theme", "tutors");
      setIconLib(themeIcons["tutors"]);
    }
  }

</script>

<div id="top" class="tutors-container">
  {#if authenticating}
    <TutorsTerms bind:authenticating />
  {:else}
    <Modal>
      <Sidebar />
      <Infobar/>
      <MainNavigator />
      <Router {routes} />
    </Modal>
  {/if}
</div>
