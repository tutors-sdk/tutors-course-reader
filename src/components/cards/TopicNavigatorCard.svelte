<script lang="ts">
  import type { Topic } from "tutors-reader-lib/src/course/topic";
  import TopicNavigator from "../navigators/TopicNavigator.svelte";
  import { layout } from "../../stores";
  import { onDestroy } from "svelte";
  import Image from "./Image.svelte";

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

<div class="topicnavigator {cardWidths}">
  <div class="topicnavigator-title">
    <h3 class="card-title  {headingText}">{topic.lo.title}</h3>
  </div>
  <figure class="flex justify-center">
    <Image lo={topic.lo}/>
  </figure>
  <div class="card-body">
    <div class="text-left text-base-content {text}">
      <TopicNavigator {topic} />
    </div>
  </div>
</div>
