<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Topic } from "../services/course/topic";
  import type { Cache } from "../services/course/cache";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import UnitCard from "../components/cards/UnitCard.svelte";
  import TalkCard from "../components/cards/TalkCard.svelte";
  import { navigatorProps } from "../services/course/stores";

  export let params: any = {};
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");

  let topic: Topic = null;
  let title = "";

  function initMainNavigator() {
    navigatorProps.set({
      title: {
        title: topic.lo.title,
        subTitle: cache.course.lo.title,
        img: topic.lo.img
      },
      parent: {
        show: true,
        icon: "moduleHome",
        link: `#/course/${cache.course.url}`,
        tip: "To module home ..."
      }
    });
    title = topic.lo.title;
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

<div class="container mx-auto mt-4">
  {#if topic}
    {#each topic.panelVideos as lo}
      <VideoCard {lo} />
    {/each}
    {#each topic.panelTalks as lo}
      <TalkCard {lo} />
    {/each}
    {#each topic.units as unit}
      <div class="mt-4">
        <UnitCard {unit} />
      </div>
    {/each}
    <CardDeck los={topic.standardLos} />
  {/if}
</div>
