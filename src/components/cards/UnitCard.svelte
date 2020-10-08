<script lang="ts">
  import Card from "./Card.svelte";
  import VideoDeck from "../card-decks/VideoDeck.svelte";
  import CardDeck from "../card-decks/CardDeck.svelte";

  import type { Lo } from "../../services/lo";
  export let unit: Lo;
  const panelVideos = unit.los.filter((lo) => lo.type == "panelvideo");
  const panelTalks = unit.los.filter((lo) => lo.type == "paneltalk");
  const standardLos = unit.los.filter((lo) => lo.type != "panelvideo" && lo.type != "paneltalk");
</script>

<VideoDeck videos={panelVideos} />
<div class="uk-card-title unit-title uk-padding-small">{unit.title}</div>
<CardDeck los={standardLos} />
