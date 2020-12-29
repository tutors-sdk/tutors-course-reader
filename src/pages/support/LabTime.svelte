<script lang="ts">
  import { LabCountSheet } from "../../components/sheets/lab-count-sheet";
  import { onMount, getContext } from "svelte";
  import { Grid } from "ag-grid-community";
  import { options } from "../../components/sheets/lab-sheet";
  import { Cache } from "../../services/course/cache";
  import { MetricsService } from "../../services/analytics/metrics-service";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../../components/iconography/icons";

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
    if (allLabs) {
      timeSheet.populateCols(allLabs);
      timeSheet.populateRow(user, allLabs);
      timeSheet.render(timeGrid);
    }
  });

  let exportExcel = function () {
    timeGrid.gridOptions.api.exportDataAsExcel()
  };
</script>

<div class="flex justify-around justify-center p-1">
  <div class="w-1/2">
    <div class="text-base font-light text-gray-900"> Time spent on each lab </div>
  </div>
  <div class="w-1/4">
    <button class="tooltip" on:click={exportExcel}>
      <Icon class="icon-timeExport" data={getIconFromType('timeExport')} scale="1.5" />
      <span class='tooltip-text'> Export this sheet to excel </span>
    </button>
  </div>
</div>
<div style="height:{timeHeight}px">
  <div bind:this={time} style="height: 100%; width:100%" class="ag-theme-balham" />
</div>
