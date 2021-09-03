<script lang="ts">
  import { currentCourse, currentLo } from "../../../services/course/stores";
  import { getContext } from "svelte";
  import CalendarCard from "../../cards/CalendarCard.svelte";
  import Image from "../../cards/Image.svelte";
  import type { Lo } from "../../../services/course/lo";

  let lo: Lo;
  const { open } = getContext("simple-modal");
  const unsubscribe = currentLo.subscribe(current => {
    lo = current;
  });

</script>

{#if $currentLo}
  <Image {lo} miniImage={true} />
  <div class="flex-1 hidden px-2 mx-2 lg:block">
    <p class="text-lg font-bold">{$currentLo.title}</p>
    {#if $currentLo.title != $currentCourse.lo.title}
      <p class="text-sm font-bold">{$currentCourse.lo.title}</p>
    {:else}
      <p class="text-sm font-bold">{$currentCourse.lo.properties.credits}</p>
    {/if}
  </div>
{/if}
<div class="justify-center flex-1 hidden px-2 mx-2 lg:flex text-left text-base-content">
  {#if $currentCourse.currentWeek}
    <div data-tip="Module Calendar"
         class="hidden lg:block w-auto h-auto pl-4 pr-4 border rounded-lg bg-base-100 text-base-content tooltip">
      <label for="title-modal" class="modal-button">
        <div class="text-l pt-2">{$currentCourse.currentWeek.title} </div>
        <div class="text-sm"> calendar</div>
      </label> <input type="checkbox" id="title-modal" class="modal-toggle">
      <CalendarCard />
    </div>
  {/if}
</div>
