<script lang="ts">
  import Card from "./Card.svelte";
  import type { Lo } from "../../services/course/lo";

  export let los: Lo[] = [];
</script>

{#if los.length}
  <div class="bg-base-200 text-base-content rounded-box mb-2 p-2">
    <div class="flex flex-wrap justify-center">
      {#each los as lo}
        <Card {lo} />
      {/each}
    </div>
  </div>
{/if}
