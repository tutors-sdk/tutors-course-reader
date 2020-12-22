<script lang="ts">
  import Card from "./Card.svelte";
  import type { Lo } from "../../services/course/lo";
  export let los: Lo[] = [];
</script>

{#if los}
  {#each los as lo}
    <div class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
      <Card {lo} />
    </div>
  {/each}
{/if}
