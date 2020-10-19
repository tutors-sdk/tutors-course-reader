<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import type { Course } from "../../services/course/course";
  import TopicNavigator from "./TopicNavigator.svelte";
  export let course: Course = null;
</script>

<style>
  .bar {
    background: black;
  }
</style>

{#each course.topics as topic}
  <ul class="uk-nav bar">
    <li class="uk-parent">
      <a class="item uk-link-muted" href={topic.lo.route}>
        <Icon data={getIconFromType(topic.lo.type)} scale="1" />
        {topic.lo.title}
      </a>
      <ul class="uk-nav-sub">
        <TopicNavigator {topic} />
      </ul>
    </li>
  </ul>
{/each}
