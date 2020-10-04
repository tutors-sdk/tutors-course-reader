<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import type { Topic } from "../services/topic";
  import type { CourseRepo } from "../services/course-repo";
  import UnitDeck from "../elements/card-decks/UnitDeck.svelte";
  import { dispatchTopicNavProps } from "../elements/navigators/navigator-properties";
  export let params: any = {};

  const courseRepo: CourseRepo = getContext("courseRepo");
  let topic: Topic = null;
  onMount(async () => {
    topic = await courseRepo.fetchTopic(params.wild);
    dispatchTopicNavProps(dispatch, courseRepo.course, topic);
  });
</script>

{#if topic}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    <UnitDeck units={topic.units} />
  </div>
{/if}
