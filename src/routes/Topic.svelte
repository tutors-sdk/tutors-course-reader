<script lang="ts">
  import { onMount } from "svelte";
  import type { Topic } from "../services/topic";
  import { getRepo } from "../repo";
  import UnitDeck from "../elements/card-decks/UnitDeck.svelte";
  export let params: any = {};

  let courseRepo = getRepo();
  let topic: Topic = null;
  onMount(async () => {
    topic = await courseRepo.fetchTopic(params.wild);
    console.log(topic);
  });
</script>

{#if topic}
  <div class="uk-container uk-padding-small">
    <UnitDeck units={topic.units} />
  </div>
{/if}
