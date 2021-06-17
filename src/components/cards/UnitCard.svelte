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

<div class="card border mx-auto my-8 p-8 bg-base-100">
  <div class="flex justify-between w-full p-4">
    <h2 class="card-title text-base-content text-center">
      {unit.title}
    </h2>
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

