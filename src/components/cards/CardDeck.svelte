<script lang="ts">
  import Card from "./Card.svelte";
  import type { Lo } from "../../reader-lib/types/lo-types";

  export let los: Lo[] = [];
</script>

{#if los.length}
  <div class="carddeck-bg">
    <div class="flex flex-wrap justify-center">
      {#each los as lo}
        <Card {lo} />
      {/each}
    </div>
  </div>
{/if}
