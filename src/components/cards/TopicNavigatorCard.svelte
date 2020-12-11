<script lang="ts">
  import type { Topic } from "../../services/course/topic";
  import TopicNavigator from "../navigators/TopicNavigator.svelte";
  import { getIconFromType } from "../iconography/icons";
  import Icon from "svelte-awesome";

  export let topic: Topic;

  export let showTopicNav = true;
  let close = function () {
    showTopicNav = !showTopicNav;
  };

</script>

<style>
  button {
    border: none;
  }
</style>

<div class="bg-white rounded-lg overflow-hidden shadow-xl">
  <div class="p-2">
    <h4 class="font-semibold text-lg truncate text-center"> {topic.lo.title} </h4>
  </div>
  <img class="h-48 w-full object-cover" src="{topic.lo.img}"  alt={topic.lo.title}>
  <div class="p-6">
    <div class="text-gray-600 text-xs uppercase font-semibold tracking-wide mt-2 leading-tight truncate">
      <TopicNavigator {topic} />
    </div>
  </div>
</div>

