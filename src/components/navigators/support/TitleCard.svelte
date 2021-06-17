<script lang="ts">
  import TutorsIcon from "../../iconography/TutorsIcon.svelte";
  import { currentCourse, navigatorProps } from "../../../services/course/stores";
  import { getContext } from "svelte";
  import CalendarCard from "../../cards/CalendarCard.svelte";

  const { open } = getContext("simple-modal");
  const showCalendar = () => {
    open(CalendarCard);
  };
</script>

<div class="justify-center flex-1 hidden px-2 mx-2 lg:flex text-left text-white">
  <div class="flex-none"><img src={$navigatorProps.title.img} width="60" alt="img" /></div>
  <div class="flex-1 pl-4">
    <h1 class="card-title">{$navigatorProps.title.title}</h1>
    <div class="hidden lg:block">
      <h2 class="card-subtitle">{$navigatorProps.title.subTitle}</h2>
    </div>
  </div>
  {#if $currentCourse.currentWeek}
    <div class="hidden lg:block w-auto h-auto border rounded-lg bg-white text-black tooltip">
      <span class="tooltip-text">module calendar</span>
      <button on:click={showCalendar} class="py-2 px-4">
        <div class="text-l">{$currentCourse.currentWeek.title} </div>
        <div class="text-sm"> calendar</div>
      </button>
    </div>
  {/if}
  <div class="hidden lg:block py-5 px-4 w-1/6">
    <TutorsIcon />
  </div>
</div>
