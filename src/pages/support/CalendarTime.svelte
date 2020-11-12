<script lang="ts">
  import type { UserMetric } from "../../services/analytics/metrics-types";
  import { onMount, beforeUpdate } from "svelte";
  import { Grid } from "ag-grid-community";
  import { options } from "../../components/sheets/lab-sheet";
  import type {Calendar} from "../../services/course/lo";
  import {CalendarSheet} from "../../components/sheets/calendar-sheet";

  let calendar;
  let calendarGrid;
  let calendarHeight = 600;

  export let user: UserMetric;
  export let calendarData : Calendar;
  let calendarSheet = new CalendarSheet();

  beforeUpdate(() => {
    if (calendarData && user) {
      calendarSheet.populateCols(calendarData);
      calendarSheet.populateRow(user, calendarData);
      calendarSheet.render(calendarGrid);
    }
  });

  onMount(async () => {
    calendarGrid = new Grid(calendar, {...options});
  });

</script>
<div class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">
  <div class="uk-card-header"> Time spent on each lab (estimated) </div>
  <div class="uk-card-body" style="height:{calendarHeight}px">
    <div bind:this={calendar} style="height: 100%; width:100%" class="ag-theme-balham" />
  </div>
</div>
