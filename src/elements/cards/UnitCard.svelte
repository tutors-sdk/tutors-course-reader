<script lang="ts">
  import Card from "./Card.svelte";
  import type { Lo } from "../../services/lo";
  export let unit: Lo;
  const panelVideos = unit.los.filter((lo) => lo.type == "panelvideo");
  const panelTalks = unit.los.filter((lo) => lo.type == "paneltalk");
  const standardLos = unit.los.filter((lo) => lo.type != "panelvideo" && lo.type != "paneltalk");
</script>

<div class="uk-card uk-card-body uk-padding-small">
  <div class="uk-card-title unit-title">{unit.title}</div>
  <div class="uk-child-width-1-4@s uk-flex uk-flex-center" uk-grid uk-height-match="target: div > .uk-card">
    {#each standardLos as lo}
      <div class="uk-card">
        <Card {lo} />
      </div>
    {/each}
  </div>
</div>
