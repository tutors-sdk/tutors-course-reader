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

<div class="card bg-white shadow-md border rounded-lg overflow-hidden dark:bg-black dark:text-white">
  <div class="card-block">
    <div class="px-6 py-4">
      <div class="font-sm font-light text-xl mb-2 text-center">{topic.lo.title} </div>
    </div>
    <hr>
    <div class="flex justify-center">
      <img class="h-48" src="{topic.lo.img}" alt="{topic.lo.title}">
    </div>
    <hr>
    <div class="px-3 py-4 text-left">
      <p class="text-sm font-light">
        <TopicNavigator {topic} />
      </p>
    </div>
  </div>
</div>


