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

<div class="container mx-auto px-4">
  <div class="flex justify-between w-full">
    <div class="p-3 font-sm font-semibold text-xl text-center">
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

