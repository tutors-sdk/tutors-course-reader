<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import type { Topic } from "../services/topic";
  import { getRepo } from "../repo";
  import UnitDeck from "../elements/card-decks/UnitDeck.svelte";
  import { dispatchTopicNavProps } from "../elements/navigators/navigator-properties";
  export let params: any = {};

  let courseRepo = getRepo();
  let topic: Topic = null;
  onMount(async () => {
    topic = await courseRepo.fetchTopic(params.wild);
    dispatchTopicNavProps(dispatch, courseRepo.course, topic);
  });
</script>

{#if topic}
  <div class="uk-container uk-padding-small">
    <UnitDeck units={topic.units} />
  </div>
{/if}
