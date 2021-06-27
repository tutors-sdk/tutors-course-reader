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
    if (lo.type == "video") {
      lo.route = lo.video;
    }
  }
</script>

<style>
  .card {
    height: auto
  }
</style>

<div class="card compact text-center shadow-2xl bg-base-100 w-full 2xl:w-1/6 xl:w-1/5 lg:w-1/4 md:w-1/3 m-2">
  <a href="{lo.route}" target="{target}" in:fade={{ duration: 800 }}>
    <div class="flex flex-row justify-between items-center p-3">
      <h3 class="card-title">{lo.title}</h3>
      <Icon type="{lo.type}" />
    </div>
    <figure class="flex justify-center">
      <img loading="lazy" class="rounded-xl object-scale-down p-1 h-48" src="{lo.img}" alt="{lo.title}">
    </figure>
    <div class="card-body">
      <div class="text-center text-base-content line-clamp-3">
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
