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
  import { titleProps, tocVisible, parent } from "../services/course/stores";
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");

  function initMainNav() {
    titleProps.set({
      title: topic.lo.title,
      subTitle: cache.course.lo.properties.credits,
      img: topic.lo.img,
    });
    tocVisible.set(true);
    parent.set({
      visible: true,
      icon: "moduleHome",
      link: `#/course/${cache.course.url}`,
      tip: "To module home ...",
    });
  }

  let topic: Topic = null;
  onMount(async () => {
    topic = await cache.fetchTopic(params.wild);
    initMainNav();
    analytics.pageLoad(params.wild, cache.course, topic.lo);
  });
</script>

{#if topic}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    {#each topic.panelVideos as lo}
      <VideoCard {lo} />
    {/each}
    {#each topic.units as unit}
      <UnitCard {unit} />
    {/each}
    <CardDeck los={topic.standardLos} />
  </div>
{/if}
