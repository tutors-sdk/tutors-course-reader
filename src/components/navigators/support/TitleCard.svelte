<script lang="ts">
  import TutorsIcon from "../../iconography/TutorsIcon.svelte";
  import { currentCourse, currentLo } from "../../../services/course/stores";
  import { getContext } from "svelte";
  import CalendarCard from "../../cards/CalendarCard.svelte";

  const { open } = getContext("simple-modal");
</script>

{#if $currentLo}
  {#if $currentLo.img}
    <div class="flex-none ml-2"><img src={$currentLo.img} width="50" alt="img" /></div>
  {/if}
  <div class="flex-1 hidden px-2 mx-2 lg:block">
    <p class="text-lg font-bold">{$currentLo.title}</p>
    <p class="text-sm font-bold">{$currentCourse.lo.title}</p>
  </div>
{/if}
<div class="justify-center flex-1 hidden px-2 mx-2 lg:flex text-left text-base-content">
  {#if $currentCourse.currentWeek}
    <div class="hidden lg:block w-auto h-auto pl-4 pr-4 border rounded-lg bg-base-100 text-base-content tooltip">
      <span class="tooltip-text">module calendar</span> <label for="title-modal" class="modal-button">
      <div class="text-l pt-2">{$currentCourse.currentWeek.title} </div>
      <div class="text-sm"> calendar</div>
    </label> <input type="checkbox" id="title-modal" class="modal-toggle">
      <CalendarCard />
    </div>
  {/if}
  <div class="hidden lg:block py-5 px-4 w-1/6">
    <TutorsIcon />
  </div>
</div>
