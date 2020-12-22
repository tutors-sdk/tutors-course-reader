<script lang="ts">
  import { location } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import { createEventDispatcher, getContext } from "svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import type { Lo } from "../services/course/lo";
  import type { Cache } from "../services/course/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import {navigatorProps, revealSidebar, week} from "../services/course/stores";
  export let params: any = {};

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let lo: Lo = null;
  let refreshVideo = true;
  let title = "";

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
    revealSidebar.set(false);
    navigatorProps.set(navigator);
    week.set(cache.course.currentWeek);
  }

  location.subscribe((value) => {
    if (cache.course) {
      const ref = `/#${value}`;
      lo = cache.course.videos.get(ref);
      if (lo) {
        refreshVideo = !refreshVideo;
        analytics.pageLoad(params.wild, cache.course, lo);
        initMainNavigator();
      }
    }
  });

  onMount(async () => {
    await cache.fetchCourseFromTalk(params.wild);
    const ref = `/#/video/${params.wild}`;
    lo = cache.course.videos.get(ref);
    analytics.pageLoad(params.wild, cache.course, lo);
    initMainNavigator();
  });

  let showTopicNav;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#if lo}
  <div class="flex justify-center items-center flex-wrap" in:fade={{ duration: 500 }}>
    <div class="w-10/12">
      {#key refreshVideo}
        <VideoCard bind:showTopicNav={showTopicNav} {lo} />
      {/key}
    </div>
    {#if showTopicNav}
      <div class="w-2/12">
        <TopicNavigatorCard bind:showTopicNav={showTopicNav} topic={lo.parent} />
      </div>
    {/if}
  </div>
{/if}
