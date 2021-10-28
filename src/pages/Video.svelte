<script lang="ts">
  import { getContext } from "svelte";
  import type { Lo } from "../services/course/lo";
  import type { Cache } from "../services/course/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { currentLo, revealSidebar } from "../services/course/stores";
  import { talkTransition } from "../components/animations";
  import {querystring} from 'svelte-spa-router'

  export let params: any = {};
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let lo: Lo = null;
  let title = "";

  async function getVideo(url) {
    console.log($querystring);
    revealSidebar.set(false);
    let videoId = params.wild;
    if ($querystring) {
      videoId+="?"+$querystring;
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
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#await getVideo(params.wild) then lo}
  <div class="h-screen flex">
    <div transition:talkTransition class="w-full">
      <VideoCard {lo} />
    </div>
    <div class="hidden md:block">
      <TopicNavigatorCard topic={lo.parent} />
    </div>
  </div>
{/await}


