<script lang="ts">
  import type { Topic } from "../../services/course/topic";
  import TopicNavigator from "../navigators/TopicNavigator.svelte";
  import { layout } from "../../services/course/stores";
  import { onDestroy } from "svelte";

  export let topic: Topic;

  let imageHeight = "";
  let headingText = "";
  let text = "";
  let cardWidths = "";

  const unsubscribe = layout.subscribe(layout => {
    if (layout === "compacted") {
      imageHeight = "h-20";
      headingText = "text-xs font-medium";
      text = "text-xs";
      cardWidths = "w-32";
    } else {
      imageHeight = "h-48";
      headingText = "text-md font-normal";
      text = "text-sm";
      cardWidths = "w-72";
    }
  });
  onDestroy(unsubscribe);
</script>

<div class="card compact text-center shadow-2xl bg-base-200 {cardWidths} m-2">
  <div class="flex flex-row justify-between items-center p-3">
    <h3 class="card-title  {headingText}">{topic.lo.title}</h3>
  </div>
  <figure class="flex justify-center">
    <img loading="lazy" class="rounded-xl object-scale-down p-1 {imageHeight}" src="{topic.lo.img}"
         alt="{topic.lo.title}">
  </figure>
  <div class="card-body">
    <div class="text-left text-base-content {text}">
      <TopicNavigator {topic} />
    </div>
  </div>
</div>
