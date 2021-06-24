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
    height: auto
  }
</style>

<div class="card text-center shadow-2xl bg-base-300 w-full xl:w-1/5 lg:w-1/4 md:w-1/3 m-2">
  <a href="{lo.route}" target="{target}" in:fade={{ duration: 800 }}>
    <div class="flex flex-row justify-between items-center p-2">
      <h3 class="card-title pt-3">{lo.title}</h3>
      <Icon type="{lo.type}" />
    </div>
    <figure class="px-1 pt-1">
      <img loading="lazy" class="rounded-xl" src="{lo.img}" alt="{lo.title}">
    </figure>
    <div class="card-body">
      <div class="px-1 py-1 text-center text-base-content line-clamp-3">
        {#if $currentCourse && !$currentCourse.areVideosHidden()}
          {#if lo.video && lo.type !== "video"}
            <Icon link="{lo.video}" type="video" toolTip="Play video for this talk" />
          {/if}
        {/if}<p>
        {@html lo.summary}
      </p>
      </div>
    </div>
  </a>
</div>
