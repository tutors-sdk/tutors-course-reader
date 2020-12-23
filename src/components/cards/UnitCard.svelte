<script lang="ts">
  import VideoCard from "../cards/VideoCard.svelte";
  import TalkCard from "../cards/TalkCard.svelte";
  import CardDeck from "./CardDeck.svelte";

  import type { Lo } from "../../services/course/lo";
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
<div class="flex flex-col text-left w-full mb-12">
  <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">{unit.title}</h1>
</div>

<CardDeck los={standardLos} />
