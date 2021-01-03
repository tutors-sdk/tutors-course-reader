<script lang="ts">
  import { Cache } from "../../services/course/cache";
  import { getContext } from "svelte";

  const cache: Cache = getContext("cache");
  let title = cache.course.lo.title;
  let calendar = cache.course.calendar;
  let currentWeek = cache.course.currentWeek;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

</script>

{#if currentWeek}
  <table class="table-auto w-full text-gray-900">
    <caption>{calendar.title} : {title} </caption>
    <thead>
      <tr>
        <th class="w-1/3">Week No.</th>
        <th class="w-1/3">Type</th>
        <th class="w-1/3">Date Starts</th>
      </tr>
    </thead>
    <tbody class="text-center">
      {#each calendar.weeks as week}
        {#if currentWeek.title == week.title}
          <tr class="bg-gray-800 text-white">
            <td class="bg-gray-800 text-white"> {week.title}</td>
            <td>{week.type}</td>
            <td>{monthNames[week.dateObj.getMonth(week.dateObj)]} {week.dateObj.getDate()}</td>
          </tr>
        {:else}
          <tr>
            <td>{week.title}</td>
            <td>{week.type}</td>
            <td>{monthNames[week.dateObj.getMonth(week.dateObj)]} {week.dateObj.getDate()}</td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
{/if}
