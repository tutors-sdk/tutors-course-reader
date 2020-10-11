<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { onMount, onDestroy, getContext } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import UnitCard from "../components/cards/UnitCard.svelte";
  import type { Cache } from "../services/cache";
  import type { AnalyticsService } from "../services/analytics-service";
  import { pageLoad } from "../services/page-support/pageload";
  export let params: any = {};

  let course: Course = null;
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");

  let standardDeck = true;
  let pinBuffer = "";
  let ignorePin = "";
  function keypressInput(e) {
    pinBuffer = pinBuffer.concat(e.key);
    if (pinBuffer === ignorePin) {
      course.showAllLos();
      standardDeck = false;
    }
  }

  onMount(async () => {
    await cache.fetchCourse(params.wild);
    course = cache.course;
    pageLoad(params.wild, course, course.lo, analytics, dispatch);
    if (course.lo.properties.ignorepin) {
      ignorePin = "" + course.lo.properties.ignorepin;
    }
    window.addEventListener("keydown", keypressInput);
  });

  onDestroy(async () => {
    window.removeEventListener("keypress", keypressInput);
  });
</script>

{#if course}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    {#each course.units as unit}
      <UnitCard {unit} />
    {/each}
    {#if standardDeck}
      <CardDeck los={course.standardLos} />
    {:else}
      <CardDeck los={course.allLos} />
    {/if}
  </div>
{/if}
