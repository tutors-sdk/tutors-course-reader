<script lang="ts">
  import { onMount, onDestroy, getContext } from "svelte";
  import { fade, fly } from "svelte/transition";
  import LabTime from "./support/LabTime.svelte"
  import InstructorLabTime from "./support/InstructorLabTime.svelte"
  import CalendarTime from "./support/CalendarTime.svelte"
  import InstructorCalendarTime from "./support/instructorCalendarTime.svelte"
  import LiveTime from "./support/LiveTime.svelte"
  import type { Course } from "../services/course/course";
  import type {Calendar, Lo} from "../services/course/lo";
  import type { Cache } from "../services/course/cache";
  import { MetricsService } from "../services/analytics/metrics-service";
  import type { User, UserMetric } from "../services/analytics/metrics-types";
  export let params: any = {};
  import {navigatorProps, week} from "../services/course/stores";

  let instructorMode = false;

  let course: Course = null;
  let calendarData : Calendar = null;
  const cache: Cache = getContext("cache");
  let title = "";
  const metricsService = new MetricsService ();

  let user: UserMetric;
  let userMap = new Map<string, UserMetric>();
  let users, users2: IterableIterator<UserMetric>;
  let allLabs: Lo[] = [];

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
  });

  let pinBuffer = "";
  let ignorePin = "";

  function keypressInput(e) {
    pinBuffer = pinBuffer.concat(e.key);
    if (pinBuffer === ignorePin) {
      instructorModeOn();
    }
  }

  async function instructorModeOn() {
    instructorMode = true;
    if (userMap.size == 0) {
      userMap = await metricsService.fetchAllUsers(course);
      if (course.hasEnrollment()) {
        userMap = metricsService.filterUsers(userMap, course.getStudents());
      }
      users = userMap.values();
      users2 = userMap.values();
    }
  }

  onDestroy(async () => {
    window.removeEventListener("keypress", keypressInput);
  });
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css" />
  <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-balham.css" />
</svelte:head>

<div class = "uk-padding-small" in:fade={{ duration: 500 }}>

  {#if !instructorMode}
    <LabTime bind:allLabs={allLabs} bind:user={user}/>
    <CalendarTime bind:calendarData={calendarData} bind:user={user}/>
  {:else}
    <InstructorLabTime bind:allLabs={allLabs} bind:users={users2}/>
    <InstructorCalendarTime bind:calendarData={calendarData} bind:users={users}/>
  {/if}
  <div class="uk-divider"></div>

  <LiveTime bind:course={course} bind:allLabs={allLabs} />
</div>
