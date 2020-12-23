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
  <VideoCard class="mb-4" {lo} />
{/each}
{#each panelTalks as lo}
  <TalkCard {lo} />
{/each}
<div class="flex flex-col text-left w-full ">
  <div class="text-xl text-gray-900 pt-8">{unit.title}</div>
</div>

<CardDeck los={standardLos} />
