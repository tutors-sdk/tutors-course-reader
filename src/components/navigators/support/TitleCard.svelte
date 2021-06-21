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


<div class="flex-none ml-2"><img src={$navigatorProps.title.img} width="50" alt="img" /></div>
<div class="flex-1 hidden px-2 mx-2 lg:block">
  <p class="text-lg font-bold">{$navigatorProps.title.title}</p>
  <p class="text-sm font-bold">{$navigatorProps.title.subTitle}</p>
</div>

<div class="justify-center flex-1 hidden px-2 mx-2 lg:flex text-left text-base-content">
  {#if $currentCourse.currentWeek}
    <div class="hidden lg:block w-auto h-auto border rounded-lg bg-base-100 text-base-content tooltip">
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
