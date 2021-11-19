<script lang="ts">
  import { fade } from "svelte/transition";
  import Icon from "../iconography/Icon.svelte";
  import { getIcon } from "../iconography/themes";
  import type { Lo } from "tutors-reader-lib/src/course/lo";
  import { currentCourse, layout } from "../../stores";
  import { cardTransition } from "../animations";
  import { onDestroy } from "svelte";
  import Image from "./Image.svelte";

  let type = "default";
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

  let headingText = "";
  let text = "";
  let cardWidths = "";

  const unsubscribe = layout.subscribe(layout => {
    if (layout === "compacted") {
      headingText = "text-xs font-medium";
      text = "text-xs";
      cardWidths = "w-32 h-56";
    } else {
      headingText = "text-md font-normal";
      text = "text-sm";
      cardWidths = "w-60";
    }
  });
  onDestroy(unsubscribe);
</script>

<div transition:cardTransition class="tutorscard {cardWidths} border-{getIcon(lo.type).colour}">
  <a href="{lo.route}" target="{target}" in:fade={{ duration: 800 }}>
    <div class="tutorscard-header">
      <h3 class="card-title {headingText}">{lo.title}</h3>
      <Icon type="{lo.type}" />
    </div>
    <figure class="flex justify-center">
      <Image {lo}/>
    </figure>
    <div class="card-body">
      <div class="tutorscard-body">
        {#if $currentCourse && !$currentCourse.areVideosHidden()}
          {#if lo.video && lo.type !== "video"}
            <Icon link="{lo.video}" width="40" height="40" type="video" toolTip="Play video for this talk" />
          {/if}
        {/if}<p>
        <div class="{text}">
          {@html lo.summary}
        </div>
      </div>
    </div>
  </a>
</div>

