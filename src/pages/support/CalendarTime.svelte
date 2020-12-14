<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { Grid } from "ag-grid-community";
  import { options } from "../../components/sheets/calendar-sheet";
  import { CalendarSheet } from "../../components/sheets/calendar-sheet";
  import { Cache } from "../../services/course/cache";
  import { MetricsService } from "../../services/analytics/metrics-service";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../../components/iconography/icons";

  export let id;

  let calendar;
  let calendarGrid;
  let calendarHeight = 600;
  let calendarSheet = new CalendarSheet();

  const cache: Cache = getContext("cache");
  const metricsService :MetricsService = getContext("metrics");

  onMount(async () => {
    calendarGrid = new Grid(calendar, {...options});
    const calendarData = cache.course.calendar;
    if (calendarData) {
      const user = await metricsService.fetchUserById(cache.course, id);
      calendarSheet.populateCols(calendarData);
      calendarSheet.populateRow(user, calendarData);
      calendarSheet.render(calendarGrid);
    }
  });

  let exportExcel = function () {
    calendarGrid.gridOptions.api.exportDataAsExcel()
  };
</script>

<div class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">
  <div uk-grid>
    <div class="uk-width-expand@m">
      <div class="uk-text"> Time online this semester </div>
    </div>
    <div class="uk-width-1-4@m">
      <button class="uk-button uk-button-link" on:click={exportExcel} uk-tooltip="title: Export this sheet to excel; pos: bottom">
        <Icon class="icon-timeExport" data={getIconFromType('timeExport')} scale="1.5" />
      </button>
    </div>
  </div>
  <div class="uk-card-body" style="height:{calendarHeight}px">
    <div bind:this={calendar} style="height: 100%; width:100%" class="ag-theme-balham" />
  </div>
</div>
