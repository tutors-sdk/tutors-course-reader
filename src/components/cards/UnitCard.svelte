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

<div class="bg-base-200 text-base-content rounded-box mb-2">
  <div class="flex justify-between w-full p-3">
    <h2 class="text-xl font-bold">
      {unit.title}
    </h2>
    <Icon type="{unit.type}" scale="1.5" />
  </div>
  <div class="flex flex-wrap justify-center">
  {#each panelVideos as lo}
    <VideoCard class="m-4" {lo} />
  {/each}
  {#each panelTalks as lo}
    <TalkCard {lo} />
  {/each}
  <CardDeck los={standardLos} />
</div>
</div>

