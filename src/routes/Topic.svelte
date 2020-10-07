<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import type { Topic } from "../services/topic";
  import type { Cache } from "../services/cache";
  import UnitDeck from "../elements/card-decks/UnitDeck.svelte";
  import { getCouseTitleProps } from "../elements/navigators/navigator-properties";
  import { getIconFromType } from "../elements/iconography/icons";
  export let params: any = {};

  const cache: Cache = getContext("cache");
  let topic: Topic = null;

  onMount(async () => {
    topic = await cache.fetchTopic(params.wild);
    dispatchTopicNavProps(dispatch, cache.course, topic);
  });
  export function dispatchTopicNavProps(dispatcher, course: Course, topic: Topic) {
    let titleProps = getCouseTitleProps(course);
    titleProps.title = topic.lo.title;
    titleProps.subtitle = course.lo.title;
    titleProps.img = topic.lo.img;
    titleProps.parentIcon = getIconFromType("moduleHome");
    titleProps.parentTip = "To module home ...";
    titleProps.parentLink = `#/course/${course.url}`;
    dispatcher("routeEvent", titleProps);
  }
</script>

{#if topic}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    <UnitDeck units={topic.units} />
  </div>
{/if}
