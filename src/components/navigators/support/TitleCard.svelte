<script lang="ts">
  import { currentCourse, currentLo } from "../../../stores";
  import { getContext } from "svelte";
  import CalendarCard from "../../cards/CalendarCard.svelte";
  import Image from "../../cards/Image.svelte";
  import type { Lo } from "tutors-reader-lib/src/course/lo";

  let lo: Lo;
  const { open } = getContext("simple-modal");
  const unsubscribe = currentLo.subscribe(current => {
    lo = current;
    if (lo && lo.type==="unit") {
      lo.img = lo.parentLo.img;
      lo.icon = lo.parentLo.icon;
    }
  });

</script>

{#if $currentLo}
<div class="flex-1">
  <Image {lo} miniImage={true} />
  <div class="navbar-title">
    <p class="text-lg font-bold">{$currentLo.title}</p>
    {#if $currentLo.title != $currentCourse.lo.title}
      <p class="text-sm font-bold">{$currentCourse.lo.title}</p>
    {:else}
      <p class="text-sm font-bold">{$currentCourse.lo.properties.credits}</p>
    {/if}
  </div>
</div>
{/if}
<div class="navbar-calendar">
  {#if $currentCourse.currentWeek}
  {#if $currentCourse.currentWeek.type = "tuition"}
    <div data-tip="Module Calendar"
         class="hidden lg:block w-auto h-auto pl-4 pr-4 button button-lg rounded-xl bg-success text-base-content tooltip">
      <label for="title-modal" class="modal-button">
        <div class="text-sm pt-1">current week</div>
        <div class="text-l pb-1">{$currentCourse.currentWeek.title}</div>
      </label> <input type="checkbox" id="title-modal" class="modal-toggle">
      <CalendarCard />
    </div>
  {:else if $currentCourse.currentWeek.type = "reading"}
    <div data-tip="Module Calendar"
      class="hidden lg:block w-auto h-auto pl-4 pr-4 button button-lg rounded-xl bg-info text-base-content tooltip">
      <label for="title-modal" class="modal-button">
        <div class="text-sm pt-1">current week</div>
        <div class="text-l pb-1">{$currentCourse.currentWeek.title}</div>
      </label> <input type="checkbox" id="title-modal" class="modal-toggle">
      <CalendarCard />
    </div>
  {:else}
    <div data-tip="Module Calendar"
         class="hidden lg:block w-auto h-auto pl-4 pr-4 button button-lg rounded-xl bg-base-100 text-base-content tooltip">
      <label for="title-modal" class="modal-button">
        <div class="text-sm pt-1">current week</div>
        <div class="text-l pb-1">{$currentCourse.currentWeek.title}</div>
      </label> <input type="checkbox" id="title-modal" class="modal-toggle">
      <CalendarCard />
    </div>
  {/if}
  {/if}
</div>
