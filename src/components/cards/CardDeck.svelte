<script lang="ts">
  import Card from "./Card.svelte";
  import type { Lo } from "../../services/course/lo";
  export let los: Lo[] = [];
</script>

<div class="flex flex-wrap lg:-mx-4">
  {#if los}
    {#each los as lo}
      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
        <Card {lo} />
      </div>
    {/each}
  {/if}
</div>
