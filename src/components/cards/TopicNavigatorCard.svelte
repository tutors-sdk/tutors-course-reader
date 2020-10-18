<script lang="ts">
  import type { Topic } from "../../services/course/topic";
  import TopicNavigator from "../navigators/TopicNavigator.svelte";
  export let topic: Topic;
</script>

<div class="uk-card uk-card-default uk-card-small uk-padding-small">
  <div class="card-title">{topic.lo.title}</div>
  <div class="uk-card-body"><img src={topic.lo.img} alt="img" /></div>
  <div class="uk-card-footer">
    <TopicNavigator {topic} />
  </div>
</div>
