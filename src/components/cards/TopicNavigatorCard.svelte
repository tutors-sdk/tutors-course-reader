<script lang="ts">
  import type { Topic } from "../../services/course/topic";
  import TopicNavigator from "../navigators/TopicNavigator.svelte";

  export let topic: Topic;
</script>

<style>
  .card {
    max-width: 350px;
    height: auto
  }
</style>

<div class="card compact bg-base-100 border shadow-xl overflow-hidden text-base-content">
  <div class="card-block">
    <div class="px-6 py-4">
      <h2 class="card-title text-base-content mb-2 text-center">{topic.lo.title} </h2>
    </div>
    <div class="flex justify-center">
      <img class="h-48" src="{topic.lo.img}" alt="{topic.lo.title}">
    </div>
    <div class="text-left">
      <p class="card-body">
        <TopicNavigator {topic} />
      </p>
    </div>
  </div>
</div>


