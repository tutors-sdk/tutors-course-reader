<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import type { Cache } from "../services/course/cache";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import type { Lo } from "../services/course/lo";
  import { navigatorProps } from "../services/course/stores";
  import { RingLoader } from "svelte-loading-spinners";

  let los: Lo[] = [];

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let refresh = false;
  let loading = true;
  let tickerTape = "Loading...";
  let courseNmr = 0;
  let total = 0;

  $ : total = courseNmr;

  function initMainNavigator() {
    navigatorProps.set({
      title: {
        title: "Tutors Course Snapshot",
        subTitle: `${total} known Tutors modules, sorted by page views`,
        img: "/favicon.ico"
      },
      parent: {
        show: false,
        link: ``,
        icon: "",
        tip: ""
      }
    });
  }

  onMount(async () => {
    initMainNavigator();
    const courses = await analytics.fetchAllCourseList();
    for (let i = 0; i < courses.length; i++) {
      courseNmr++;
      const courseLo = await cache.fetchCourse(`${courses[i].url}.netlify.app`);
      if (courseLo != null) {
        courseLo.lo.route = `#/course/${courses[i].url}.netlify.app`;
        courseLo.lo.summary = `Page views: ${courses[i].visits} <br> <small>Last access <br> ${courses[i].last} <small>`;
        los.push(courseLo.lo);
        tickerTape = courseLo.lo.title;
      }
    }
    refresh = !refresh;
    loading = false;
    initMainNavigator();
  });

</script>

<div class="container mx-auto">
  {#if loading}
    <div class="shadow-md border rounded-lg overflow-hidden mt-4">
      <div class="flex border justify-center items-center">
        <RingLoader size="280" color="#FF3E00" unit="px" />
        {total} : {tickerTape}
      </div>
    </div>
  {:else}
    <CardDeck los={los} />
  {/if}
</div>

