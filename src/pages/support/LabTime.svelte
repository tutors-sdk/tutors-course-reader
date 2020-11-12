<script lang="ts">
  import { LabCountSheet } from "../../components/sheets/lab-count-sheet";
  import type { UserMetric } from "../../services/analytics/metrics-types";
  import type { Lo } from "../../services/course/lo";
  import { onMount, beforeUpdate } from "svelte";
  import { Grid } from "ag-grid-community";
  import { options } from "../../components/sheets/lab-sheet";

  let time;
  let timeGrid;
  let timeHeight = 250;

  export let user : UserMetric;
  export let allLabs: Lo[] = [];
  let timeSheet = new LabCountSheet();

  beforeUpdate(() => {
    if (allLabs && user) {
      timeSheet.populateCols(allLabs);
      timeSheet.populateRow(user, allLabs);
      timeSheet.render(timeGrid);
    }
  });

  onMount(async () => {
    timeGrid = new Grid(time, {...options});
  });

</script>
<div class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">
  <div class="uk-card-header"> Time spent on each lab (estimated) </div>
  <div class="uk-card-body" style="height:{timeHeight}px">
    <div bind:this={time} style="height: 100%; width:100%" class="ag-theme-balham" />
  </div>
</div>
