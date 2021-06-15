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
    max-width: 300px;
    min-width: 300px;
    height: auto
  }
</style>

<a href="{lo.route}" target="{target}" in:fade={{ duration: 800 }}>
   <div class="card text-center shadow-2xl">
  <figure class="px-10 pt-10">
    <img loading="lazy" class="rounded-xl" src="{lo.img}" alt="{lo.title}">
  </figure>
  <div class="card-body">
    <h2 class="card-title">{lo.title} </h2>
    <Icon type="{lo.type}" scale="1.5" />
  <div class="px-6 py-4 text-center">
    {#if $currentCourse && !$currentCourse.areVideosHidden()}
      {#if lo.video && lo.type !== "video"}
        <Icon link="{lo.video}" type="video" scale="2" toolTip="Play video for this talk"/>
      {/if}
    {/if}
    <p>
      {@html lo.summary}
    </p>
  </div>
  </div>
</div>
</a>
