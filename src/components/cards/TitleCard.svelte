<script lang="ts">
  import TutorsIcon from "../iconography/TutorsIcon.svelte";
  import { navigatorProps, week } from "../../services/course/stores";
  import { getContext } from 'svelte';
  import CalendarCard from "./CalendarCard.svelte"
  import { revealSidebar, courseUrl } from "../../services/course/stores";
  import TocBtn from "../navigators/TocBtn.svelte";

  const { open } = getContext('simple-modal');
  const showCalendar = () => {
    open(CalendarCard);
  };
</script>

<div class="bg-white border shadow justify-center items-center flex w-1/2 p-4 ml-1 mt-1">
    <div class="hidden md:block w-1/6"><img src={$navigatorProps.title.img} width="60" alt="img" /></div>
    <div class="w-2/3">
      <div class="course-title">{$navigatorProps.title.title}</div>
      <div class="text-sm text-gray-600">{$navigatorProps.title.subTitle}</div>
    </div>
  {#if $week}
    <div class="hidden lg:block w=1/5">
        <button on:click={showCalendar} class="py-2 px-4 border" uk-tooltip="title: Click for module calendar; pos: bottom">
          <div class="uk-text-bold">  {$week.title} </div>
          <div class="uk-text-small uk-text-light"> calendar </div>
        </button>
      </div>
  {/if}
    <div class="hidden lg:block py-2 px-4 w-1/6">
      <TutorsIcon />
    </div>
</div>
