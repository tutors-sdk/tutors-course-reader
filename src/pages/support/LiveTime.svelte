<script lang="ts">
  import {onMount, onDestroy, getContext, beforeUpdate} from "svelte";
  import { LabLiveSheet } from "../../components/sheets/lab-live-sheet"
  import {MetricsService} from "../../services/analytics/metrics-service";
  import type {Course} from "../../services/course/course";
  import type {User} from "../../services/analytics/metrics-types";
  import type {Lo} from "../../services/course/lo";
  import { Grid } from "ag-grid-community";
  import { options } from "../../components/sheets/lab-sheet";

  let canUpdate = false;
  const func = () => {
    canUpdate = true;
  };
  setTimeout(func, 30 * 1000);

  export let course : Course;
  export let allLabs: Lo[] = [];

  let created = false;

  let live;
  let liveGrid;
  let liveHeight = 600;
  let liveApi;
  let liveSheet = new LabLiveSheet();
  const metricsService = new MetricsService ();

  function topicUpdate(user: User, topicTitle: string) {
    if (canUpdate) {
      let rowNode = liveApi.getRowNode(user.nickname);
      if (rowNode) {
        liveSheet.updateTopic(topicTitle, rowNode);
      } else {
        liveSheet.populateTopic(user, topicTitle);
        liveSheet.render(liveGrid);
      }
    }
  }

  function labUpdate(user: User, lab: string) {
    if (canUpdate) {
      let rowNode = liveApi.getRowNode(user.nickname);
      if (rowNode) {
        liveSheet.updateLab(lab, rowNode);
      } else {
        liveSheet.populateLab(user, lab);
        liveSheet.render(liveGrid);
      }
    }
  }

  beforeUpdate(() => {
    if (course && !created) {
      created = true;
      liveGrid = new Grid(live, {...options });
      metricsService.startMetricsService(course, labUpdate, topicUpdate);

      liveApi = liveGrid.gridOptions.api;
      liveSheet.populateCols(allLabs);
      liveSheet.render(liveGrid);
    }
  });

  onDestroy(async () => {
    metricsService.stopService();
  });

</script>

<div class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">
  <div class="uk-card-header"> Students online now </div>
  <div class="uk-card-body" style="height:{liveHeight}px">
    <div bind:this={live} style="height: 100%; width:100%" class="ag-theme-balham" />
  </div>
</div>
