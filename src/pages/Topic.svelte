<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { fade } from "svelte/transition";
  import type { Topic } from "../services/course/topic";
  import type { Cache } from "../services/course/cache";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import UnitCard from "../components/cards/UnitCard.svelte";
  export let params: any = {};
  import {navigatorProps, revealSidebar, week} from "../services/course/stores";
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");

  let topic: Topic = null;
  let title = "";

  function initMainNavigator() {
    const navigator = {
      tocShow: true,
      title: {
        title: topic.lo.title,
        subTitle: cache.course.lo.properties.credits,
        img: topic.lo.img,
      },
      parent: {
        show: true,
        icon: "moduleHome",
        link: `#/course/${cache.course.url}`,
        tip: "To module home ...",
      },
      companions: cache.course.companions,
      walls: cache.course.wallBar,
    }
    title = topic.lo.title;
    revealSidebar.set(false);
    navigatorProps.set(navigator);
    week.set(cache.course.currentWeek);
  }

  onMount(async () => {
    topic = await cache.fetchTopic(params.wild);
    initMainNavigator();
    analytics.pageLoad(params.wild, cache.course, topic.lo);
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="container mx-auto p-8">
  <div class="flex flex-wrap mt-24">
  {#if topic}
    {#each topic.panelVideos as lo}
      <VideoCard {lo} />
    {/each}
    {#each topic.units as unit}
      <div class="mt-4">
        <UnitCard {unit}/>
      </div>
    {/each}
    <CardDeck los={topic.standardLos} />
  {/if}
  </div>
</div>
