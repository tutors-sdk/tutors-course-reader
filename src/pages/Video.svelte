<script lang="ts">
  import { getContext } from "svelte";
  import type { Lo } from "../services/course/lo";
  import type { Cache } from "../services/course/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { currentLo, revealSidebar } from "../services/course/stores";

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
  <div class="container mx-auto p-2">
    <div class="flex items-center justify-center">
      <div class="w-full">
        <VideoCard {lo} />
      </div>
      <div class="hidden lg:block mx-2">
        <TopicNavigatorCard topic={lo.parent} />
      </div>
    </div>
  </div>
{/await}


