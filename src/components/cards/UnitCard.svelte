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

<div class="flex flex-wrap justify-items-center w-full shadow-md rounded-lg p-6 bg-gray-10 border mt-4">
  {#each panelVideos as lo}
    <VideoCard class="m-4" {lo} />
  {/each}
  {#each panelTalks as lo}
    <TalkCard {lo} />
  {/each}
  <div class="flex flex-col text-left w-full ">
    <div class="text-xl pt-2">{unit.title}</div>
  </div>
  <CardDeck los={standardLos} />
</div>
