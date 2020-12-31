<script lang="ts">
  import Card from "./Card.svelte";
  import type { Lo } from "../../services/course/lo";

  export let los: Lo[] = [];
</script>

<div class="flex flex-wrap justify-center w-full">
  {#each los as lo}
    <Card {lo} />
  {/each}
</div>
