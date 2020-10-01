<script lang="ts">
  import Card from "./Card.svelte";
  import type { Lo } from "../../services/lo";
  export let los: Lo[] = [];
</script>

<div class="uk-child-width-1-4@s uk-flex uk-flex-center" uk-grid uk-height-match="target: div > .uk-card">
  {#each los as lo}
    <div class="uk-card">
      <Card {lo} />
    </div>
  {/each}
</div>
