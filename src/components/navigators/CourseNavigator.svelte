<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import type { Course } from "../../services/course/course";
  import TopicNavigator from "./TopicNavigator.svelte";

  export let course: Course = null;
</script>

{#each course.topics as topic}
  <div class="flex flex-col">
    <a class="ml-2" href={topic.lo.route}>
      <Icon data={getIconFromType(topic.lo.type)} scale="1" />
      {topic.lo.title}
    </a>
    <TopicNavigator {topic} />
  </div>
{/each}
