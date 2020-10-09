<script lang="ts">
  import VideoCard from "../cards/VideoCard.svelte";
  import TalkCard from "../cards/TalkCard.svelte";
  import CardDeck from "./CardDeck.svelte";

  import type { Lo } from "../../services/lo";
  export let unit: Lo;
  const panelVideos = unit.los.filter((lo) => lo.type == "panelvideo");
  const panelTalks = unit.los.filter((lo) => lo.type == "paneltalk");
  const standardLos = unit.los.filter((lo) => lo.type != "panelvideo" && lo.type != "paneltalk");
</script>

{#each panelVideos as lo}
  <VideoCard {lo} />
{/each}
{#each panelTalks as lo}
  <TalkCard {lo} />
{/each}
<div class="uk-card-title unit-title uk-padding-small">{unit.title}</div>
<CardDeck los={standardLos} />
<hr class="uk-divider-icon" />
