<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import type { Course } from "../../services/course";
  import TopicNavigator from "./TopicNavigator.svelte";
  export let course: Course = null;
</script>

{#each course.topics as topic}
  <ul class="uk-nav">
    <li class="uk-parent">
      <a class="item" href={topic.lo.route}>
        <Icon data={getIconFromType(topic.lo.type)} scale="1" />
        {topic.lo.title}
      </a>
      <ul class="uk-nav-sub">
        <TopicNavigator {topic} />
      </ul>
    </li>
  </ul>
{/each}
