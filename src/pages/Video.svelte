<script lang="ts">
  import { getContext } from "svelte";
  import type { Lo } from "../services/course/lo";
  import type { Cache } from "../services/course/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { currentLo, revealSidebar } from "../services/course/stores";
  import { talkTransition } from "../components/animations";

  export let params: any = {};
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let lo: Lo = null;
  let title = "";

  async function getVideo(url) {
    revealSidebar.set(false);
    await cache.fetchCourseFromTalk(params.wild);
    const ref = `/#/video/${params.wild}`;
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
  <div class="container mx-auto py-4 h-screen grid grid-cols-5 gap-2">
    <div transition:talkTransition class="col-span-5 lg:col-span-4">
      <VideoCard {lo} />
    </div>
    <div class="w-64 lg:w-full">
      <TopicNavigatorCard topic={lo.parent} />
    </div>
  </div>
{/await}


