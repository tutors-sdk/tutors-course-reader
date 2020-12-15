<script lang="ts">
  import TutorsIcon from "../iconography/TutorsIcon.svelte";
  import { navigatorProps, week } from "../../services/course/stores";
  import { getContext } from 'svelte';
  import CalendarCard from "./CalendarCard.svelte"

  const { open } = getContext('simple-modal');
  const showCalendar = () => {
    open(CalendarCard);
  };
</script>

<div class="uk-width-3-5@m  uk-card uk-card-default uk-padding-small uk-visible@m uk-border-rounded">
  <div class="uk-flex uk-flex-center uk-flex-middle  uk-grid uk-padding-remove">
    <div class="uk-width-1-6@m"><img src={$navigatorProps.title.img} width="60" alt="img" /></div>
    <div class="uk-width-expand@m uk-text-left">
      <div class="course-title">{$navigatorProps.title.title}</div>
      <div class="uk-text-muted uk-text-small">{$navigatorProps.title.subTitle}</div>
    </div>
    {#if $week}
      <div class="uk-width-1-5@m">
        <button on:click={showCalendar} class="uk-button uk-button-default" uk-tooltip="title: Click for module calendar; pos: bottom">
          <div class="uk-text-bold">  {$week.title} </div>
          <div class="uk-text-small uk-text-light"> calendar </div>
        </button>
      </div>
    {/if}
    <div class="uk-width-1-6@m">
      <TutorsIcon />
    </div>
  </div>
</div>
