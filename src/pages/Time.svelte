<script lang="ts">
  import { onMount, onDestroy, getContext } from "svelte";
  import { fade, fly } from "svelte/transition";
  import type { Course } from "../services/course/course";
  import type {Calendar, Lo} from "../services/course/lo";
  import type { Cache } from "../services/course/cache";
  import { options } from "../components/sheets/lab-sheet"
  import { LabCountSheet } from "../components/sheets/lab-count-sheet"
  import { LabLiveSheet } from "../components/sheets/lab-live-sheet"
  import { Grid } from "ag-grid-community";
  import { MetricsService } from "../services/analytics/metrics-service";
  import type { User, UserMetric } from "../services/analytics/metrics-types";
  export let params: any = {};
  import {navigatorProps, week} from "../services/course/stores";
  import {CalendarSheet} from "../components/sheets/calendar-sheet";

  const func = () => {
    canUpdate = true;
  };
  setTimeout(func, 30 * 1000);

  let course: Course = null;
  let calendarData : Calendar = null;
  const cache: Cache = getContext("cache");
  let title = "";
  const metricsService = new MetricsService ();

  let user: UserMetric;
  let allLabs: Lo[] = [];
  let timeSheet = new LabCountSheet()
  let liveSheet = new LabLiveSheet()
  let calendarSheet = new CalendarSheet()
  let users = new Map<string, UserMetric>();

  let time;
  let timeGrid;
  let timeHeight = 250;

  let live;
  let liveGrid;
  let liveHeight = 600;
  let liveApi;

  let calendar;
  let calendarGrid;
  let calendarHeight = 600;
  let calendarApi;

  let canUpdate = false;

  function initMainNavigator() {
    const navigator = {
      tocShow: true,
      title: {
        title: course.lo.title,
        subTitle: cache.course.lo.properties.credits,
        img: course.lo.img,
      },
      parent: {
        show: true,
        icon: "moduleHome",
        link: `#/course/${cache.course.url}`,
        tip: "To module home ...",
      },
      companions: cache.course.companions,
      walls: cache.course.wallBar,
    }
    title = course.lo.title;
    navigatorProps.set(navigator)
    week.set(cache.course.currentWeek);
  }

  const onTimeGridReady = () => {
    timeSheet.populateCols(allLabs);
    timeSheet.populateRow(user, allLabs);
    timeSheet.render(timeGrid);
  };

  const onLiveGridReady = () => {
    liveApi = liveGrid.gridOptions.api;
    liveSheet.populateCols(allLabs);
    liveSheet.render(liveGrid);
  };

  const onCalendarGridReady = () => {
    calendarApi = calendarGrid.gridOptions.api;
    calendarSheet.populateCols(calendarData);
    calendarSheet.render(calendarGrid);
  };


  onMount(async () => {
    window.addEventListener("keydown", keypressInput);
    const url = params.wild.substring(0, params.wild.indexOf("/"));
    course = await cache.fetchCourse(url);
    calendarData = course.calendar;
    initMainNavigator();
    if (course.lo.properties.ignorepin) {
      ignorePin = "" + course.lo.properties.ignorepin;
    }
    allLabs = course.walls.get("lab")
    const id = params.wild.substring(params.wild.indexOf("/")+1);
    user = await metricsService.fetchUserById(course, id);
    timeGrid = new Grid(time, {...options, onGridReady:onTimeGridReady});
    liveGrid = new Grid(live, {...options, onGridReady:onLiveGridReady});
    if (calendarData) {
      calendarGrid = new Grid(calendar, {
        ...options,
        onGridReady: onCalendarGridReady
      });
    }
    await metricsService.startMetricsService(course, labUpdate, topicUpdate);
  });

  let pinBuffer = "";
  let ignorePin = "";

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

  function keypressInput(e) {
    pinBuffer = pinBuffer.concat(e.key);
    if (pinBuffer === ignorePin) {
      instructorModeOn();
    }
  }

  async function instructorModeOn() {
    if (users.size == 0) {
      users = await metricsService.fetchAllUsers(course);
      if (course.hasEnrollment()) {
        users = metricsService.filterUsers(users, course.getStudents());
      }
    }
    users.forEach((user, id) => {
      timeSheet.populateRow(user, allLabs);
    });
    timeHeight = 1200;
    timeSheet.render(timeGrid);
  }

  onDestroy(async () => {
    window.removeEventListener("keypress", keypressInput);
    metricsService.stopService();
  });
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css" />
  <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-balham.css" />
</svelte:head>

<div class = "uk-padding-small" in:fade={{ duration: 500 }}>
  <div class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">
    <div class="uk-card-header"> Time spent on each lab (estimated) </div>
    <div class="uk-card-body" style="height:{timeHeight}px">
      <div bind:this={time} style="height: 100%; width:100%" class="ag-theme-balham" />
    </div>
  </div>
  {#if calendarData}
    <div class="uk-divider"></div>
    <div class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">
      <div class="uk-card-header"> Calendar Timeline </div>
      <div class="uk-card-body" style="height:{calendarHeight}px">
        <div bind:this={calendar} style="height: 100%; width:100%" class="ag-theme-balham" />
      </div>
    </div>
  {/if}
  <div class="uk-divider"></div>
  <div class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">
    <div class="uk-card-header"> Students online now </div>
    <div class="uk-card-body" style="height:{liveHeight}px">
      <div bind:this={live} style="height: 100%; width:100%" class="ag-theme-balham" />
    </div>
  </div>
</div>
