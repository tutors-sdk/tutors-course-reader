<script lang="ts">
  import { onMount } from "svelte";
  import type { Topic } from "../services/topic";
  import { getRepo } from "../repo";
  export let params: any = {};

  let courseRepo = getRepo();
  let topic: Topic = null;
  onMount(async () => {
    topic = await courseRepo.fetchTopic(params.wild);
  });
</script>

<h1>Topic</h1>
{#if topic}
  <h1>{topic.lo.title}</h1>
{/if}
