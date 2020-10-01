<script lang="ts">
  import CardRow from "./CardRow.svelte";
  import { generateRows } from "../../services/utils/card-utils";
  import type { Lo } from "../../services/lo";
  export let unit: Lo;
  const panelVideos = unit.los.filter((lo) => lo.type == "panelvideo");
  const panelTalks = unit.los.filter((lo) => lo.type == "paneltalk");
  const standardLos = unit.los.filter((lo) => lo.type != "panelvideo" && lo.type != "paneltalk");
  const loRows = generateRows(standardLos);
</script>

<div class="uk-card uk-card-body uk-padding-small">
  <div class="uk-card-title unit-title">{unit.title}</div>
  {#each loRows as los}
    <CardRow los={standardLos} />
    <hr class="uk-divider" />
  {/each}
</div>
