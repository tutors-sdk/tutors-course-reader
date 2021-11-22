<script lang="ts">
  import { getContext, onMount } from "svelte";
  import TalkCard from "../components/cards/TalkCard.svelte";
  import type { CourseService } from "../services/course-service";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import type { AnalyticsService } from "../services/analytics-service";
  import { currentLo, revealSidebar } from "../stores";
  // @ts-ignore
  import * as animateScroll from "svelte-scrollto";
  import { talkTransition } from "../components/animations";

  export let params: any = {};

  const cache: CourseService = getContext("cache");
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
      <div class="hidden lg:block">
        <TopicNavigatorCard topic={lo.parent} />
      </div>
    </div>
  {/if}
{/await}


