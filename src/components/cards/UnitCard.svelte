<script lang="ts">
  import VideoCard from "../cards/VideoCard.svelte";
  import TalkCard from "../cards/TalkCard.svelte";
  import CardDeck from "./CardDeck.svelte";
  import type { Lo } from "../../services/course/lo";
  import { layout, currentCourse } from "../../services/course/stores";
  import { onDestroy } from "svelte";
  export let unit: Lo;
  const panelVideos = unit.los.filter((lo) => lo.type == "panelvideo");
  const panelTalks = unit.los.filter((lo) => lo.type == "paneltalk");
  const standardLos = unit.los.filter((lo) => lo.type != "panelvideo" && lo.type != "paneltalk");
  import { currentCourse } from "../../services/course/stores";
  import Image from "./Image.svelte";

  let text="text-xl font-bold";
  const unsubscribe = layout.subscribe(layout => {
    if (layout === "compacted") {
      text="text-l font-normal";
    } else {
      text="text-xl font-normal";
    }
  });
  onDestroy(unsubscribe);

</script>



<div class="bg-base-200 text-base-content rounded-box p-2 mb-2">
  <div class="flex justify-between w-full">
    <h2 id="{unit.id}" class="p-2 {text}">
      {unit.title}
    </h2>
    <Image lo={$currentCourse.lo} miniImage={true} />
  </div>
  <div class="flex flex-wrap justify-center">
    {#each panelVideos as lo}
      <VideoCard {lo} />
    {/each}
    {#each panelTalks as lo}
      <TalkCard {lo} />
    {/each}
    <CardDeck los={standardLos} />
  </div>
</div>

