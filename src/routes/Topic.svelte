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

{#if topic}
  <h1>{topic.lo.title}</h1>
  <ul>
    {#each topic.units as unit}
      <h2>{unit.title}</h2>
      {#each unit.los as lo}
        <li><a href={lo.route}>{lo.title}</a></li>
      {/each}
    {/each}
  </ul>
{/if}
