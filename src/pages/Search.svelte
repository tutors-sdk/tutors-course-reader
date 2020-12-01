<script lang="ts">
  import { onMount, getContext } from "svelte";
  import type { Cache } from "../services/course/cache";
  const cache: Cache = getContext("cache");
  import {navigatorProps, week} from "../services/course/stores";
  export let params: any = {};
  let title = "";
  let course;

  function initMainNavigator() {
    const navigator = {
      tocShow: true,
      title: {
        title: course.lo.title,
        subTitle: course.lo.properties.credits,
        img: course.lo.img
      },
      parent: {
        show: true,
        icon: "moduleHome",
        link: `#/course/${cache.course.url}`,
        tip: "To module home ...",
      },
      companions: course.companions,
      walls: course.wallBar,
    }
    title = course.lo.title;
    navigatorProps.set(navigator);
    week.set(course.currentWeek);
  }

  onMount(async () => {
    course  = await cache.fetchCourse(params.wild);
    initMainNavigator();
  });

</script>

{#if course}
<h1> Search : {course.lo.title} </h1>
{/if}