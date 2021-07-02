<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Topic } from "../services/course/topic";
  import type { Cache } from "../services/course/cache";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import UnitCard from "../components/cards/UnitCard.svelte";
  import TalkCard from "../components/cards/TalkCard.svelte";
  import { currentLo } from "../services/course/stores";
  import * as animateScroll from "svelte-scrollto";
  import { beforeUpdate, afterUpdate } from 'svelte';

  export let params: any = {};
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");

  let topic: Topic = null;
  let unitId = "";
  let title = "";

  onMount(async () => {
    console.log(params.wild);
    unitId = "";
    let topicId = params.wild;
    let unitPos = topicId.indexOf("/unit");
    if (unitPos !== -1) {
      unitId = topicId.substr(unitPos+1);
      console.log(unitId);
      topicId = topicId.substr(0, unitPos);
      console.log(topicId);
    }
    topic = await cache.fetchTopic(topicId);
    if (unitPos !== -1) {
      let unitLo = topic.lo.los.filter((lo) => lo.id == unitId);
      // noinspection TypeScriptValidateTypes
      currentLo.set(unitLo[0]);
    } else {
      // noinspection TypeScriptValidateTypes
      currentLo.set(topic.lo);
      title = topic.lo.title;
    }
    analytics.pageLoad(params.wild, cache.course, topic.lo);
  });

  afterUpdate(() => {
    if (unitId) {
      animateScroll.scrollTo({ delay: 500, element: '#' + unitId });
    }
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
      <div class="mt-4 mb-4">
        <UnitCard {unit} />
      </div>
    {/each}
    <CardDeck los={topic.standardLos} />
  {/if}
</div>
