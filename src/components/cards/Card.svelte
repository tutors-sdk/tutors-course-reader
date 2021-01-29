<script lang="ts">
  import { fade } from "svelte/transition";
  import Icon from "../iconography/Icon.svelte";
  import type { Lo } from "../../services/course/lo";
  import { currentCourse } from "../../services/course/stores";

  export let lo: Lo;
  let target = "";
  if (lo.type === "web") {
    if (lo.route.startsWith("http")) {
      target = "_blank";
    }
  }

 if (lo) {
   if (lo.type=="video") {
     lo.route = lo.video;
   }
 }
</script>

<style>
  .card {
    max-width: 250px;
    min-width: 250px;
    height: auto
  }
</style>

<a href="{lo.route}" target="{target}"
   class="card m-4 block bg-white border shadow-md hover:shadow-xl dark:hover:bg-white dark:hover:text-black rounded-lg overflow-hidden dark:bg-black dark:text-white"
   in:fade={{ duration: 800 }}>
  <div class="flex flex-row justify-between items-center p-2">
    <div class="font-sm font-light text-xl text-center">{lo.title} </div>
    <Icon type="{lo.type}" scale="1.5" />
  </div>
  <hr>
  <div class="flex justify-center">
    <img loading="lazy" class="object-scale-down p-1 h-48" src="{lo.img}" alt="{lo.title}">
  </div>
  <hr>
  <div class="px-6 py-4 text-center">
    {#if $currentCourse && !$currentCourse.areVideosHidden()}
      {#if lo.video && lo.type !== "video"}
        <Icon link="{lo.video}" type="video" scale="2" toolTip="Play video for this talk"/>
      {/if}
    {/if}
    <p class="text-base font-light mt-2 line-clamp-3">
      {@html lo.summary}
    </p>
  </div>

</a>
