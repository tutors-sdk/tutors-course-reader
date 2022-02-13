<script lang="ts">
  import { afterUpdate, getContext, tick } from "svelte";
  import type { Lo } from "../reader-lib/types/lo-types";
  import type { CourseService } from "../reader-lib/services/course-service";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import type { AnalyticsService } from "../reader-lib/services/analytics-service";
  import { currentLo, revealSidebar } from "../stores";
  import { talkTransition, viewDelay } from "../components/animations";
  import { querystring } from "svelte-spa-router";
  // @ts-ignore
  import * as animateScroll from "svelte-scrollto";

  export let params: any = {};
  const cache: CourseService = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let lo: Lo = null;
  let title = "";


  let hide = true;
  setTimeout(function() {
    hide = false;
  }, viewDelay);

  async function getVideo(url) {
    revealSidebar.set(false);
    let videoId = params.wild;
    if ($querystring) {
      videoId += "?" + $querystring;
    }
    await cache.fetchCourseFromTalk(videoId);
    const ref = `/#/video/${videoId}`;
    lo = cache.course.videos.get(ref);
    analytics.pageLoad(params.wild, cache.course, lo);
    // noinspection TypeScriptValidateTypes
    currentLo.set(lo);
    title = lo.title;
    return lo;
  }

  afterUpdate(async () => {
    animateScroll.scrollTo({ delay: 200, element: "#top" });
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#await getVideo(params.wild) then lo}
  {#if !hide}
    <div class="h-screen flex">
      <div transition:talkTransition class="w-full">
        <VideoCard {lo} />
      </div>
      <div class="hidden md:block">
        <TopicNavigatorCard topic={lo.parent} />
      </div>
    </div>
  {/if}
{/await}


