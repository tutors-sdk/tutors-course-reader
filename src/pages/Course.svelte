<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import type { Course } from "../services/course/course";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import UnitCard from "../components/cards/UnitCard.svelte";
  import type { Cache } from "../services/course/cache";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { currentLo, revealSidebar } from "../services/course/stores";

  export let params: any = {};

  let course: Course = null;
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let title = "";
  let standardDeck = true;
  let pinBuffer = "";
  let ignorePin = "";

  async function getCourse(url) {
    revealSidebar.set(false);
    course = await cache.fetchCourse(url);
    // noinspection TypeScriptValidateTypes
    currentLo.set(course.lo);
    title = course.lo.title;
    analytics.pageLoad(url, course, course.lo);
    if (course.lo.properties.ignorepin) {
      ignorePin = "" + course.lo.properties.ignorepin;
    }
    return course;
  }

  function keypressInput(e) {
    pinBuffer = pinBuffer.concat(e.key);
    if (pinBuffer === ignorePin) {
      course.showAllLos();
      course.standardLos = course.allLos;
      standardDeck = false;
    }
  }

  onDestroy(async () => {
    window.removeEventListener("keydown", keypressInput);
  });

</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#await getCourse(params.wild) then course}
  <div class="container mx-auto p-4">
    {#each course.units as unit}
      <UnitCard {unit} />
    {/each}
    {#if standardDeck}
      <CardDeck los={course.standardLos} />
    {:else}
      <CardDeck los={course.allLos} />
    {/if}
  </div>
{/await}

