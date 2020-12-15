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

<div class="uk-card uk-card-default uk-card-small uk-padding-small uk-border-rounded">
  <button class="uk-button uk-button-default uk-position-top-right uk-padding-remove"  uk-tooltip="title: Close this Card; pos: bottom"  on:click={close}>
    <Icon data={getIconFromType('close')} scale="1" />
  </button>
  <div class="card-title">{topic.lo.title}</div>
  <div class="uk-card-body"><img src={topic.lo.img} alt="img" /></div>
  <div class="uk-card-footer">
    <TopicNavigator {topic} />
  </div>
</div>

