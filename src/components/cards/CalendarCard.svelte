<script lang="ts">
  import {Cache} from "../../services/course/cache";
  import {getContext} from "svelte";

  const cache: Cache = getContext("cache");
  let title = cache.course.lo.title;
  let calendar = cache.course.calendar;
  let currentWeek = cache.course.currentWeek;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

</script>
<table class="uk-table uk-table-striped uk-table-small uk-table-hover uk-text-center">
  <caption>{calendar.title} : {title} </caption>
  <thead>
    <tr>
      <th class="uk-width-small"></th>
      <th class="uk-width-small"></th>
      <th class="uk-width-small"></th>
    </tr>
  </thead>
  <tbody>
    {#each calendar.weeks as week}
      {#if currentWeek.title == week.title}
        <tr>
          <td><span class="uk-badge">{week.title}</span></td>
          <td><span class="uk-badge">{week.type}</span></td>
          <td><span class="uk-badge">{monthNames[week.dateObj.getMonth(week.dateObj)]} {week.dateObj.getDate()}</span></td>
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

