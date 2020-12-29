<script lang="ts">
  import { onMount,  getContext } from "svelte";
  import { Grid } from "ag-grid-community";
  import "ag-grid-enterprise";
  import { options } from "../../components/sheets/calendar-sheet";
  import { CalendarSheet } from "../../components/sheets/calendar-sheet";
  import { Cache} from "../../services/course/cache";
  import { MetricsService } from "../../services/analytics/metrics-service";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../../components/iconography/icons";

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

  let exportExcel = function () {
    calendarGrid.gridOptions.api.exportDataAsExcel()
  };
</script>

<div class="flex justify-around justify-center p-1">
  <div class="w-1/2">
    <div class="text-base font-light text-gray-900"> Time online this semester </div>
  </div>
  <div class="w-1/4">
    <button class="tooltip" on:click={exportExcel}>
      <Icon class="icon-timeExport" data={getIconFromType('timeExport')} scale="1.5" />
      <span class='tooltip-text'> Export this sheet to excel </span>
    </button>
  </div>
</div>
<div style="height:{calendarHeight}px">
  <div bind:this={calendar} style="height: 100%; width:100%" class="ag-theme-balham" />
</div>
