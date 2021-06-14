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
    max-width: 25%;
    min-width: 25%;
    height: auto
  }
</style>

<a href="{lo.route}" target="{target}"
   class="card m-3 block bg-white border hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 rounded-lg overflow-hidden dark:bg-gray-900 dark:text-white"
   in:fade={{ duration: 800 }}>
  <div class="flex flex-row justify-between items-center p-4">
    <div class="font-sm font-semibold text-xl text-center">{lo.title} </div>
    <Icon type="{lo.type}" scale="1.5" />
  </div>
  <div class="flex justify-center">
    <img loading="lazy" class="object-scale-down p-1 h-48" src="{lo.img}" alt="{lo.title}">
  </div>
  <div class="px-6 py-4 text-center">
    {#if $currentCourse && !$currentCourse.areVideosHidden()}
      {#if lo.video && lo.type !== "video"}
        <Icon link="{lo.video}" type="video" scale="2" toolTip="Play video for this talk"/>
      {/if}
    {/if}
    <p class="text-base mt-2 line-clamp-3">
      {@html lo.summary}
    </p>
  </div>

</a>
