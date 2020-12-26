<script lang="ts">
  import Card from "./Card.svelte";
  import type { Lo } from "../../services/course/lo";
  export let los: Lo[] = [];
</script>

<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {#if los}
    {#each los as lo}
      <Card {lo} />
    {/each}
  {/if}
</div>
