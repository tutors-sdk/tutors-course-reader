<script lang="ts">
  import Card from "./Card.svelte";
  import type { Lo } from "../../services/course/lo";
  export let los: Lo[] = [];
</script>

<!--<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">-->
<!--<div style="display: flex; flex-wrap: wrap; justify-content: center; width: 100%; gap: 30px;" >-->
<div class="flex flex-wrap justify-center w-full" >
  {#each los as lo}
    <Card {lo} />
  {/each}
</div>
