<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import LabTime from "./support/LabTime.svelte";
  import InstructorLabTime from "./support/InstructorLabTime.svelte";
  import CalendarTime from "./support/CalendarTime.svelte";
  import InstructorCalendarTime from "./support/InstructorCalendarTime.svelte";
  import type { Course } from "../services/course/course";
  import type { Cache } from "../services/course/cache";
  import { currentLo } from "../services/course/stores";
  import { Tab, TabList, TabPanel, Tabs } from "svelte-tabs";
  import { getUserId } from "../services/analytics/auth-service";

  export let params: any = {};

  let instructorMode = false;
  let course: Course = null;
  const cache: Cache = getContext("cache");
  let title = "";
  let pinBuffer = "";
  let ignorePin = "";

  const id = getUserId();

  onMount(async () => {
    window.addEventListener("keydown", keypressInput);
    course = await cache.fetchCourse(params.wild);
    // noinspection TypeScriptValidateTypes
    currentLo.set({ title: `Tutors Time`, type: "tutorsTime", parentLo: course.lo, img: course.lo.img });
    title = `Tutors Time`;
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

<div in:fade={{ duration: 500 }} class="bg-base-200 mt-4 container mx-auto rounded-box">
  <Tabs>
    <TabList>
      <Tab> Labs</Tab>
      <Tab> Calendar</Tab>
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
