<script lang="ts">
  import { onMount,  getContext } from "svelte";
  import { Grid } from "ag-grid-community";
  import { options } from "../../components/sheets/calendar-sheet";
  import { CalendarSheet } from "../../components/sheets/calendar-sheet";
  import { Cache} from "../../services/course/cache";
  import { MetricsService } from "../../services/analytics/metrics-service";

  let calendar;
  let calendarGrid;
  let calendarHeight = 1600;
  let calendarSheet = new CalendarSheet();

  const cache: Cache = getContext("cache");
  const metricsService :MetricsService = getContext("metrics");

  onMount(async () => {
    calendarGrid = new Grid(calendar, {...options});
    const calendarData = cache.course.calendar;
    let userMap = await metricsService.fetchAllUsers(cache.course);
    calendarSheet.populateCols(calendarData);
    for (const user of userMap.values()) {
      calendarSheet.populateRow(user, calendarData)
    }
    calendarSheet.render(calendarGrid);
  });
</script>

<div class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">
  <div class="uk-card-header"> Time online this Semester </div>
  <div class="uk-card-body" style="height:{calendarHeight}px">
    <div bind:this={calendar} style="height: 100%; width:100%" class="ag-theme-balham" />
  </div>
</div>
