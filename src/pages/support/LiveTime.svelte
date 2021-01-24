<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import { LabLiveSheet, options } from "../../components/sheets/lab-live-sheet";
  import type { User } from "../../services/analytics/metrics-types";
  import { Grid } from "ag-grid-community";
  import { Cache } from "../../services/course/cache";
  import { studentsOnline } from "../../services/course/stores";
  import { Circle3 } from "svelte-loading-spinners";
  import Icon from "../../components/iconography/Icon.svelte";

  let canUpdate = true;
  // const func = () => {
  //   canUpdate = true;
  // };
  // setTimeout(func, 15 * 1000);

  let live;
  let liveGrid;
  let liveHeight = 1200;
  let liveApi;
  let liveSheet = new LabLiveSheet();

  const cache: Cache = getContext("cache");

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
    //  if (canUpdate) {
    let rowNode = liveApi.getRowNode(user.nickname);
    if (rowNode) {
      liveSheet.updateLab(lab, rowNode);
    } else {
      studentsOnline.update(n => n + 1);
      liveSheet.populateLab(user, lab);
      liveSheet.render(liveGrid);
    }
    // }
  }

  onMount(async () => {
    liveGrid = new Grid(live, { ...options });
    if (cache.course) {
      const allLabs = cache.course.walls.get("lab");
      studentsOnline.set(0);
      cache.course.metricsService.startMetricsService(labUpdate, topicUpdate);
      liveApi = liveGrid.gridOptions.api;
      liveSheet.populateCols(allLabs);
      const users = cache.course.metricsService.getLiveUsers();
      users.forEach(user => {
        liveSheet.populateUser(user);
      });
      liveSheet.render(liveGrid);
    }
  });

  onDestroy(async () => {
    //cache.course.metricsService.stopService();
  });

  let exportExcel = function() {
    liveGrid.gridOptions.api.exportDataAsExcel();
  };
</script>

<div class="flex justify-around justify-center p-1">
  <div class="w-1/2">
    <div class="text-base font-light text-gray-900">
      {#if canUpdate}
        Students online now: <span class="text-lg font-bold font-black"> {$studentsOnline} </span>
        <button class="px-9" on:click={exportExcel}>
          <Icon type="timeExport" toolTip="Export this sheet to excel" scale="1.5" />
        </button>
      {:else}
        <div class="flex flex-col justify-center items-center h-screen">
          <span class="text-base font-light text-gray-900"> Loading ... one moment please.</span>
          <Circle3 size="300" color="#FF3E00" unit="px" />
        </div>
      {/if}
    </div>
  </div>
</div>
<div style="height:{liveHeight}px">
  <div bind:this={live} style="height: 100%; width:100%" class="ag-theme-balham" />
</div>
