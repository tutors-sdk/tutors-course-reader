<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import type { Topic } from "../services/topic";
  import type { Cache } from "../services/cache";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import UnitCard from "../components/cards/UnitCard.svelte";
  import { getCouseTitleProps } from "../components/navigators/title-props";
  import { getIconFromType } from "../components/iconography/icons";
  import { checkAuth } from "../services/auth-service";
  export let params: any = {};

  const cache: Cache = getContext("cache");
  let topic: Topic = null;
  onMount(async () => {
    topic = await cache.fetchTopic(params.wild);
    checkAuth(cache.course, "topic");
    dispatchTitleProps(dispatch, cache.course, topic);
  });
  export function dispatchTitleProps(dispatcher, course: Course, topic: Topic) {
    let titleProps = getCouseTitleProps(course);
    titleProps.title = topic.lo.title;
    titleProps.subtitle = course.lo.title;
    titleProps.img = topic.lo.img;
    titleProps.parentIcon = getIconFromType("moduleHome");
    titleProps.parentTip = "To module home ...";
    titleProps.parentLink = `#/course/${course.url}`;
    titleProps.parentTarget = "";
    dispatcher("routeEvent", titleProps);
  }
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
