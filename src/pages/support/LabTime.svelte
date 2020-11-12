<script lang="ts">
  import { LabCountSheet } from "../../components/sheets/lab-count-sheet";
  import { onMount, getContext } from "svelte";
  import { Grid } from "ag-grid-community";
  import { options } from "../../components/sheets/lab-sheet";
  import { Cache } from "../../services/course/cache";
  import { MetricsService } from "../../services/analytics/metrics-service";

  export let id;

  let time;
  let timeGrid;
  let timeHeight = 250;
  let timeSheet = new LabCountSheet();

  const cache: Cache = getContext("cache");
  const metricsService :MetricsService = getContext("metrics");

  onMount(async () => {
    timeGrid = new Grid(time, {...options});
    const user = await metricsService.fetchUserById(cache.course, id);
    const allLabs = cache.course.walls.get("lab")
    timeSheet.populateCols(allLabs);
    timeSheet.populateRow(user, allLabs);
    timeSheet.render(timeGrid);
  });
</script>

<div class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">
  <div class="uk-card-header"> Time spent on each lab (estimated) </div>
  <div class="uk-card-body" style="height:{timeHeight}px">
    <div bind:this={time} style="height: 100%; width:100%" class="ag-theme-balham" />
  </div>
</div>
