<script lang="ts">
  import { setContext } from "svelte";
  import Router from "svelte-spa-router";

  import MainNavigator from "./elements/navigators/MainNavigator.svelte";
  import Blank from "./routes/Blank.svelte";
  import Course from "./routes/Course.svelte";
  import Topic from "./routes/Topic.svelte";
  import Talk from "./routes/Talk.svelte";
  import Video from "./routes/Video.svelte";
  import NotFound from "./routes/NotFound.svelte";

  import { getDefaultTitleProps } from "./elements/navigators/navigator-properties";
  import { CourseRepo } from "./services/course-repo";

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
    "*": NotFound,
  };
</script>

<MainNavigator {titleProps} />
<Router {routes} on:routeEvent={routeEvent} />
