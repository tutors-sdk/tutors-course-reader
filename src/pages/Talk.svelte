<script lang="ts">
  import { getContext, onMount } from "svelte";
  import TalkCard from "../components/cards/TalkCard.svelte";
  import type { Cache } from "../services/course/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { currentLo, revealSidebar } from "../services/course/stores";
  import * as animateScroll from "svelte-scrollto";
  import fadeScale from "svelte-transitions-fade-scale";
  import { cubicOut } from "svelte/easing";

  export let params: any = {};

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let title = "";
  let hideNav = true;

  onMount(async () => {
    setTimeout(function() {
      hideNav = false;
    }, 500);
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
  <div class="container mx-auto py-4 h-screen grid grid-cols-5 gap-2">
    <div transition:fadeScale={{
		    delay: 350,
		    duration: 350,
		    easing: cubicOut,
		    baseScale: 0.5
	    }} class="col-span-5 lg:col-span-4">
      <TalkCard {lo} />
    </div>
    <div class="w-64 lg:w-full">
      {#if !hideNav}
        <TopicNavigatorCard topic={lo.parent} />
      {/if}
    </div>
  </div>
{/await}

