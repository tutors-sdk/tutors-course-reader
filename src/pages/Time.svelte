<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import LabTime from "./support/LabTime.svelte";
  import InstructorLabTime from "./support/InstructorLabTime.svelte";
  import CalendarTime from "./support/CalendarTime.svelte";
  import InstructorCalendarTime from "./support/InstructorCalendarTime.svelte";
  import LiveTime from "./support/LiveTime.svelte";
  import type { Course } from "../services/course/course";
  import type { Cache } from "../services/course/cache";
  import { navigatorProps, week } from "../services/course/stores";
  import { Tab, TabList, TabPanel, Tabs } from "svelte-tabs";

  export let params: any = {};

  let instructorMode = false;
  let course: Course = null;
  const cache: Cache = getContext("cache");
  let title = "";
  let pinBuffer = "";
  let ignorePin = "";

  const id = params.wild.substring(params.wild.indexOf("/") + 1);

  function initMainNavigator() {
    const navigator = {
      title: {
        title: course.lo.title,
        subTitle: cache.course.lo.properties.credits,
        img: course.lo.img
      },
      parent: {
        show: true,
        icon: "moduleHome",
        link: `#/course/${cache.course.url}`,
        tip: "To module home ..."
      },
    };
    title = course.lo.title;
    navigatorProps.set(navigator);
    week.set(cache.course.currentWeek);
  }

  onMount(async () => {
    window.addEventListener("keydown", keypressInput);
    const url = params.wild.substring(0, params.wild.indexOf("/"));
    course = await cache.fetchCourse(url);
    initMainNavigator();
    if (course.lo.properties.ignorepin) {
      ignorePin = "" + course.lo.properties.ignorepin;
    }
  });

  function keypressInput(e) {
    pinBuffer = pinBuffer.concat(e.key);
    if (pinBuffer === ignorePin) {
      instructorMode = true;
    }
  }

  onDestroy(async () => {
    window.removeEventListener("keydown", keypressInput);
  });
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css" />
  <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-balham.css" />
</svelte:head>

<div in:fade={{ duration: 500 }} class="bg-white mt-2">
  <Tabs>
    <TabList>
      <Tab> Labs</Tab>
      <Tab> Calendar</Tab>
      <Tab> Live</Tab>
      {#if instructorMode}
        <Tab> Labs All Students</Tab>
        <Tab> Calendar All Students</Tab>
      {/if}
    </TabList>

    <TabPanel>
      <LabTime {id} />
    </TabPanel>
    <TabPanel>
      <CalendarTime {id} />
    </TabPanel>
    <TabPanel>
      <LiveTime />
    </TabPanel>
    {#if instructorMode}
      <TabPanel>
        <InstructorLabTime />
      </TabPanel>
      <TabPanel>
        <InstructorCalendarTime />
      </TabPanel>
    {/if}
  </Tabs>
</div>
