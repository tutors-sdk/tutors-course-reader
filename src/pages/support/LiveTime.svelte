<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import { LabLiveSheet, options } from "../../components/sheets/lab-live-sheet";
  import { MetricsService } from "../../services/analytics/metrics-service";
  import type { User } from "../../services/analytics/metrics-types";
  import { Grid } from "ag-grid-community";
  import { Cache } from "../../services/course/cache";
  import { studentsOnline } from "../../services/course/stores";
  import { RingLoader } from "svelte-loading-spinners";

  let canUpdate = false;
  const func = () => {
    canUpdate = true;
  };
  setTimeout(func, 30 * 1000);

  let live;
  let liveGrid;
  let liveHeight = 1200;
  let liveApi;
  let liveSheet = new LabLiveSheet();

  const cache: Cache = getContext("cache");
  const metricsService: MetricsService = getContext("metrics");

  function topicUpdate(user: User, topicTitle: string) {
    if (canUpdate) {
      let rowNode = liveApi.getRowNode(user.nickname);
      if (rowNode) {
        liveSheet.updateTopic(topicTitle, rowNode);
      } else {
        studentsOnline.update(n => n + 1);
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
        studentsOnline.update(n => n + 1);
        liveSheet.populateLab(user, lab);
        liveSheet.render(liveGrid);
      }
    }
  }

  onMount(async () => {
    liveGrid = new Grid(live, { ...options });
    const allLabs = cache.course.walls.get("lab");
    metricsService.startMetricsService(cache.course, labUpdate, topicUpdate);
    liveApi = liveGrid.gridOptions.api;
    liveSheet.populateCols(allLabs);
    liveSheet.render(liveGrid);
  });

  onDestroy(async () => {
    metricsService.stopService();
  });

</script>

<div class="flex justify-around justify-center p-1">
  <div class="w-1/2">
    <div class="text-base font-light text-gray-900">
      {#if canUpdate}
        Students online now: {$studentsOnline}
      {:else}
        <div class="flex flex-col justify-center items-center">
          <span class="text-base font-light text-gray-900"> Loading ... one moment please.</span>
          <RingLoader size="30" color="#FF3E00" unit="px" />
        </div>
      {/if}
    </div>
  </div>
</div>
<div style="height:{liveHeight}px">
  <div bind:this={live} style="height: 100%; width:100%" class="ag-theme-balham" />
</div>
