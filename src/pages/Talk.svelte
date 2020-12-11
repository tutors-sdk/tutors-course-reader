<script lang="ts">
  import { location } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher, getContext } from "svelte";
  import TalkCard from "../components/cards/TalkCard.svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import type { Lo } from "../services/course/lo";
  import type { Cache } from "../services/course/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import {navigatorProps, revealSidebar, week} from "../services/course/stores";

  export let params: any = {};

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let lo: Lo = null;
  let title = "";

  let refreshPdf = true;

  function initMainNavigator() {
    const navigator = {
      tocShow: true,
      title: {
        title: lo.title,
        subTitle: cache.course.lo.title,
        img: lo.img,
      },
      parent: {
        show: true,
        icon: "topic",
        link: lo.parent.lo.route,
        tip: "To parent topic ...",
      },
      companions: cache.course.companions,
      walls: cache.course.wallBar,
    }
    title = lo.title;
    revealSidebar.set(false);
    navigatorProps.set(navigator)
    week.set(cache.course.currentWeek);
  }

  location.subscribe((value) => {
    if (cache.course) {
      const ref = `/#${value}`;
      lo = cache.course.talks.get(ref);
      if (lo) {
        refreshPdf = !refreshPdf;
        analytics.pageLoad(params.wild, cache.course, lo);
        initMainNavigator();
      }
    }
  });

  onMount(async () => {
    await cache.fetchCourseFromTalk(params.wild);
    const ref = `/#/talk/${params.wild}`;
    lo = cache.course.talks.get(ref);
    analytics.pageLoad(params.wild, cache.course, lo);
    initMainNavigator();
  });

  let showTopicNav = true;
  function handleMessage(event) {
    showTopicNav = !showTopicNav;
    console.log("shpwTopicNav ", showTopicNav)
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#if lo}
  <div class="flex justify-center items-center flex-wrap">
    <div class="w-10/12">
      {#key refreshPdf}
        <TalkCard bind:showTopicNav={showTopicNav} {lo}  />
      {/key}
    </div>
    {#if showTopicNav}
      <div class="w-2/12">
        <TopicNavigatorCard bind:showTopicNav={showTopicNav} topic={lo.parent} />
      </div>
    {/if}
  </div>
{/if}
