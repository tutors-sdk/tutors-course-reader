<script lang="ts">
  import { getContext, onMount } from "svelte";
  import TalkCard from "../components/cards/TalkCard.svelte";
  import type { Cache } from "../services/course/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { currentLo, revealSidebar } from "../services/course/stores";
  import * as animateScroll from "svelte-scrollto";
  import { talkTransition } from "../components/animations";

  export let params: any = {};

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let title = "";

  let hide = true;
  setTimeout(function() {
    hide = false;
  }, 500);

  onMount(async () => {
    animateScroll.scrollTo({ delay: 800, element: "#top" });
  });

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
  {#if !hide}
    <div class="h-screen flex">
      <div transition:talkTransition class="flex-grow">
        <TalkCard {lo} />
      </div>
      <div class="hidden md:block">
        <TopicNavigatorCard topic={lo.parent} />
      </div>
    </div>
  {/if}
{/await}


