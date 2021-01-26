<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import type { Cache } from "../services/course/cache";
  import { navigatorProps, studentsOnline } from "../services/course/stores";
  import type { User } from "../services/analytics/metrics-types";
  import { LabLiveSheet, options } from "../components/sheets/lab-live-sheet";
  import { Grid } from "ag-grid-community";

  export let params: any = {};
  const cache: Cache = getContext("cache");
  let course = cache.course;
  let title = "";

  let live;
  let liveGrid;
  let liveHeight = 1200;
  let liveApi;
  let liveSheet = new LabLiveSheet();

  function initMainNavigator() {
    navigatorProps.set({
      title: {
        title: course.lo.title,
        subTitle: "Students online now",
        img: course.lo.img
      },
      parent: {
        show: true,
        icon: "moduleHome",
        link: `#/course/${cache.course.url}`,
        tip: "To module home ..."
      }
    });
    title = `${course.lo.title} :Live`;
  }

  onMount(async () => {
    initMainNavigator();
    studentsOnline.set(0);
    liveGrid = new Grid(live, { ...options });
    if (cache.course) {
      const allLabs = cache.course.walls.get("lab");
      cache.course.metricsService.startListening(labUpdate, topicUpdate, metricDelete);
      liveApi = liveGrid.gridOptions.api;
      liveSheet.populateCols(allLabs);
      const users = cache.course.metricsService.getLiveUsers();
      users.forEach(user => {
        liveSheet.populateUser(user);
      });
      studentsOnline.set(users.length);
      liveSheet.render(liveGrid);
    }
  });
  onDestroy(async () => {
    cache.course.metricsService.stopListening();
  });

  function topicUpdate(user: User, topicTitle: string) {
    let rowNode = liveApi.getRowNode(user.nickname);
    if (rowNode) {
      liveSheet.updateTopic(topicTitle, rowNode);
    } else {
      liveSheet.populateTopic(user, topicTitle);
      liveSheet.render(liveGrid);
    }
    studentsOnline.set(cache.course.metricsService.getLiveCount());
  }

  function labUpdate(user: User, lab: string) {
    let rowNode = liveApi.getRowNode(user.nickname);
    if (rowNode) {
      liveSheet.updateLab(lab, rowNode);
    } else {
      liveSheet.populateLab(user, lab);
      liveSheet.render(liveGrid);
    }
    studentsOnline.set(cache.course.metricsService.getLiveCount());
  }

  function metricDelete (user: User) {
    console.log("deleting");
    console.log(user);
    let rowNode = liveApi.getRowNode(user.nickname);
    if (rowNode) {
      liveSheet.deleteRow(rowNode);
    }
  }
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css" />
  <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-balham.css" />
</svelte:head>

<div class="flex justify-around justify-center p-1">
  <div class="w-1/2">
    <div class="text-base font-light text-gray-900">
      Students online now: <span class="text-lg font-bold font-black"> {$studentsOnline} </span>
    </div>
  </div>
</div>
<div style="height:{liveHeight}px">
  <div bind:this={live} style="height: 100%; width:100%" class="ag-theme-balham" />
</div>
