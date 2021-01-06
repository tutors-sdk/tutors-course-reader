<script lang="ts">
  import { location } from "svelte-spa-router";
  import { getContext, onMount } from "svelte";
  import type { Lo } from "../services/course/lo";
  import type { Cache } from "../services/course/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { navigatorProps } from "../services/course/stores";

  export let params: any = {};
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let lo: Lo = null;
  let refreshVideo = true;
  let title = "";

  function initMainNavigator() {
    navigatorProps.set({
      title: {
        title: lo.title,
        subTitle: cache.course.lo.title,
        img: lo.img
      },
      parent: {
        show: true,
        icon: "topic",
        link: lo.parent.lo.route,
        tip: "To parent topic ..."
      }
    });
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

<div class="container mx-auto p-2">
  {#if lo}
    <div class="flex items-center justify-center">
      <div class="w-full">
        {#key refreshVideo}
          <VideoCard {lo} />
        {/key}
      </div>
      <div class="hidden lg:block mx-2">
        <TopicNavigatorCard topic={lo.parent} />
      </div>
    </div>
  {/if}
</div>


