<script lang="ts">
  import { onMount, onDestroy, getContext, beforeUpdate} from "svelte";
  import { LabLiveSheet } from "../../components/sheets/lab-live-sheet"
  import { MetricsService} from "../../services/analytics/metrics-service";
  import type { User } from "../../services/analytics/metrics-types";
  import { Grid } from "ag-grid-community";
  import { options } from "../../components/sheets/lab-sheet";
  import { Cache } from "../../services/course/cache";

  let canUpdate = false;
  const func = () => {
    canUpdate = true;
  };
  setTimeout(func, 30 * 1000);

  let live;
  let liveGrid;
  let liveHeight = 600;
  let liveApi;
  let liveSheet = new LabLiveSheet();

  const cache: Cache = getContext("cache");
  const metricsService :MetricsService = getContext("metrics");

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

  onMount(async () => {
    liveGrid = new Grid(live, {...options });
    const allLabs = cache.course.walls.get("lab")
    metricsService.startMetricsService(cache.course, labUpdate, topicUpdate);
    liveApi = liveGrid.gridOptions.api;
    liveSheet.populateCols(allLabs);
    liveSheet.render(liveGrid);
  });

  onDestroy(async () => {
    metricsService.stopService();
  });

</script>

<div class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">
  <div uk-grid>
    <div class="uk-width-expand@m">
      <div class="uk-text"> Students online now  </div>
    </div>
    <div class="uk-width-1-4@m">
    </div>
  </div>
  <div class="uk-card-body" style="height:{liveHeight}px">
    <div bind:this={live} style="height: 100%; width:100%" class="ag-theme-balham" />
  </div>
</div>
