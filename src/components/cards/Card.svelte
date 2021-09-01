<script lang="ts">
  import { fade } from "svelte/transition";
  import Icon from "../iconography/Icon.svelte";

  import Iconify from '@iconify/svelte';
  import type { Lo } from "../../services/course/lo";
  import { currentCourse, layout } from "../../services/course/stores";
  import { cardTransition } from "../animations";
  import { onDestroy } from "svelte";

  export let lo: Lo;
  let target = "";
  if (lo.type === "web") {
    if (lo.route.startsWith("http")) {
      target = "_blank";
    }
  }

  let icon = { type: "", color: "blue", height:180 };
  if (lo) {
    if (lo.type == "video") {
      lo.route = lo.video;
    }
    if (lo.frontMatter) {
      if (lo.frontMatter.icon) {
        icon.type = lo.frontMatter.icon["type"];
        if (lo.frontMatter.icon["color"]) icon.color = lo.frontMatter.icon["color"];
      }
    }
  }

  let imageHeight = "";
  let headingText = "";
  let text = "";
  let cardWidths = "";

  const unsubscribe = layout.subscribe(layout => {
    if (layout === "compacted") {
      imageHeight = "h-20";
      headingText = "text-xs font-medium";
      text = "text-xs";
      cardWidths = "w-32 h-56";
      icon.height = 90;
    } else {
      imageHeight = "h-48";
      headingText = "text-md font-normal";
      text = "text-sm";
      cardWidths = "w-60";
      icon.height = 180;
    }
  });
  onDestroy(unsubscribe);
</script>

<div transition:cardTransition class="card compact text-center shadow-2xl bg-base-100 {cardWidths} m-2">
  <a href="{lo.route}" target="{target}" in:fade={{ duration: 800 }}>
    <div class="flex flex-row justify-between items-center p-3">
      <h3 class="card-title  {headingText}">{lo.title}</h3>
      <Icon type="{lo.type}" />
    </div>
    <figure class="flex justify-center">
      {#if icon.type}
        <Iconify icon="{icon.type}" color="{icon.color}" height="{icon.height}"></Iconify>
      {:else}
        <img loading="lazy" class="rounded-xl object-scale-down p-1 {imageHeight}" src="{lo.img}" alt="{lo.title}">
      {/if}
    </figure>
    <div class="card-body">
      <div class="text-center text-base-content line-clamp-3">
        {#if $currentCourse && !$currentCourse.areVideosHidden()}
          {#if lo.video && lo.type !== "video"}
            <Icon link="{lo.video}" type="video" toolTip="Play video for this talk" />
          {/if}
        {/if}<p>
        <div class="{text}">
          {@html lo.summary}
        </div>
      </div>
    </div>
  </a>
</div>

