<script lang="ts">
  import { getContext } from "svelte";
  import TalkCard from "../components/cards/TalkCard.svelte";
  import type { Cache } from "../services/course/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { currentLo, revealSidebar } from "../services/course/stores";

  export let params: any = {};

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let title = "";

  async function getTalk(url) {
    revealSidebar.set(false);
    await cache.fetchCourseFromTalk(params.wild);
    const ref = `/#/talk/${params.wild}`;
    let lo = cache.course.talks.get(ref);
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

{#await getTalk(params.wild) then lo}
  <div class="container mx-auto py-4 h-screen">
    <div class="flex content-start h-auto text-base-content">
      <div class="w-full">
        <TalkCard {lo} />
      </div>
      <div class="hidden lg:block mx-2">
        <TopicNavigatorCard topic={lo.parent} />
      </div>
    </div>
  </div>
{/await}
