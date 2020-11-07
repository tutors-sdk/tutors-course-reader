<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount, getContext } from "svelte";
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
  let tickerTape = "Loading..."
  let courseNmr = 0;
  let total = 0;

  $ : total = courseNmr;

  function initMainNavigator() {
    const navigator = {
      tocShow: false,
      title: { 
        title: "Tutors Course Snapshot",
        subTitle: `${total} known Tutors modules, sorted by page views`, 
        img: "/favicon.ico" 
      },
      parent: {
        show: false,
        link: ``,
        icon: "",
        tip: "",
      },
      companions:{
       show: false,
       bar: []
      },
      walls: {
        show: false,
        bar: []
      }
    }
    navigatorProps.set(navigator)
  }

  onMount(async () => {
    initMainNavigator();
    const courses = await analytics.fetchAllCourseList();
    for (let i=0; i<courses.length; i++) {
      courseNmr ++;
      const courseLo = await cache.fetchCourse(`${courses[i].url}.netlify.app`);
      courseLo.lo.route = `#/course/${courses[i].url}.netlify.app`;
      courseLo.lo.summary = `Page views: ${courses[i].visits} <br> <small>Last access <br> ${courses[i].last} <small>`;
      los.push(courseLo.lo)
      tickerTape = courseLo.lo.title;
    }
    refresh = !refresh;
    loading = false;
    initMainNavigator();
  });

</script>
{#if loading}
<div class="uk-container">
  <div class="uk-margin uk-card uk-card-default uk-card-body uk-text-center uk-text-baseline uk-height-large">
    <div class="uk-position-center">
      <RingLoader size="160" color="#FF3E00" unit="px" />
     </div>
    <div class="uk-card-footer">
      <div class="card-body uk-text-left">
        {total} : {tickerTape}
      </div>
    </div>
  </div>
</div>
{:else}
<div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
  <CardDeck los={los} />
</div>
{/if}

