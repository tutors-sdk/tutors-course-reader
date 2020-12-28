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

<div class="bg-white border shadow justify-center items-center flex  rounded-lg w-1/2 p-4 ml-1 mt-1 dark:bg-black dark:text-gray-100">
    <div class="hidden md:block w-1/6"><img src={$navigatorProps.title.img} width="60" alt="img" /></div>
    <div class="w-2/3">
      <div class="text-2xl">{$navigatorProps.title.title}</div>
      <div class="hidden lg:block">
        <div class="text-sm">{$navigatorProps.title.subTitle}</div>
      </div>
    </div>
  {#if $week}
    <div class="hidden lg:block w=1/5  border rounded-lg bg-blue-200 tooltip">
      <span class='tooltip-text'>module calendar</span>
        <button on:click={showCalendar} class="py-2 px-4">
          <div class="text-sm">  {$week.title} </div>
          <div class="text-sm"> calendar </div>
        </button>
      </div>
  {/if}
    <div class="hidden lg:block py-2 px-4 w-1/6">
      <TutorsIcon />
    </div>
</div>
