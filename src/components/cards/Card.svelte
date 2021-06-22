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

<div class="card text-center shadow-2xl bg-base-300 w-full xl:w-1/6 lg:w-1/4 md:w-1/3 m-2">
<a href="{lo.route}" target="{target}" in:fade={{ duration: 800 }}>
  <figure class="px-10 pt-10">
    <img loading="lazy" class="rounded-xl" src="{lo.img}" alt="{lo.title}">
  </figure>
  <div class="card-body">
    <h2 class="card-title">{lo.title}</h2>
    <Icon type="{lo.type}" />
  <div class="px-2 py-4 text-center text-base-content">
    {#if $currentCourse && !$currentCourse.areVideosHidden()}
      {#if lo.video && lo.type !== "video"}
        <Icon link="{lo.video}" type="video" toolTip="Play video for this talk"/>
      {/if}
    {/if}
    <p>
      {@html lo.summary}
    </p>
  </div>
  </div>
</a>
</div>
