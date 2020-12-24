<script lang="ts">
  import type { Topic } from "../../services/course/topic";
  import TopicNavigator from "../navigators/TopicNavigator.svelte";
  export let topic: Topic;
</script>

<div class="bg-white shadow-md rounded-lg overflow-hidden">
  <div class="card-block">
    <div class="px-6 py-4">
      <div class="font-sm font-light text-xl mb-2 text-center">{topic.lo.title} </div>
    </div>
    <hr>
    <div class="flex justify-center">
      <img class="h-48" src="{topic.lo.img}" alt="{topic.lo.title}">
    </div>
    <hr>
    <div class="px-6 py-4 text-left">
      <p class="text-gray-700 text-sm font-light">
        <TopicNavigator {topic} />
      </p>
    </div>
  </div>
</div>


<!--<div class="bg-white rounded-lg overflow-hidden shadow-xl">-->
<!--  <div class="p-2">-->
<!--    <h4 class="font-semibold text-lg truncate text-center"> {topic.lo.title} </h4>-->
<!--  </div>-->
<!--  <img class="h-48 w-full object-cover" src="{topic.lo.img}"  alt={topic.lo.title}>-->
<!--  <div class="p-6">-->
<!--    <div class="text-gray-600 text-xs uppercase font-semibold tracking-wide mt-2 leading-tight truncate">-->
<!--      <TopicNavigator {topic} />-->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->

