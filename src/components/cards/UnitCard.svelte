<script lang="ts">
  import VideoCard from "../cards/VideoCard.svelte";
  import TalkCard from "../cards/TalkCard.svelte";
  import CardDeck from "./CardDeck.svelte";
  import Icon from "../iconography/Icon.svelte";
  import type { Lo } from "../../services/course/lo";

  export let unit: Lo;
  const panelVideos = unit.los.filter((lo) => lo.type == "panelvideo");
  const panelTalks = unit.los.filter((lo) => lo.type == "paneltalk");
  const standardLos = unit.los.filter((lo) => lo.type != "panelvideo" && lo.type != "paneltalk");
</script>

<div class="flex flex-wrap justify-items-center w-full shadow-md rounded-lg px-4 py-2 bg-gray-10 border mt-4">
  <div class="flex justify-between w-full">
    <div class="font-sm font-light text-xl text-center">
      {unit.title}
    </div>
    <Icon type="{unit.type}" scale="1.5" />
  </div>
  {#each panelVideos as lo}
    <VideoCard class="m-4" {lo} />
  {/each}
  {#each panelTalks as lo}
    <TalkCard {lo} />
  {/each}
  <CardDeck los={standardLos} />
</div>

