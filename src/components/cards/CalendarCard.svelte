<script lang="ts">
  import { CourseService } from "../../services/course-service";
  import { getContext } from "svelte";

  const cache: CourseService = getContext("cache");
  let title = cache.course.lo.title;
  let calendar = cache.course.calendar;
  let currentWeek = cache.course.currentWeek;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

</script>

{#if currentWeek}
  <div class="modal">
    <div class="modal-box">
      <table class="table-auto w-full text-base-content">
        <caption>{calendar.title} : {title} </caption>
        <thead><br>
          <tr>
            <th class="w-1/3 text-center">Week No.</th>
            <th class="w-1/3 text-center">Type</th>
            <th class="w-1/3 text-center">Date Starts</th>
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
      <br> <label for="title-modal" class="btn">CLOSE</label>
    </div>
  </div>
{/if}
