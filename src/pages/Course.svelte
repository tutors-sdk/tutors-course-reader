<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
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

  onMount(async () => {
    await cache.fetchCourse(params.wild);
    course = cache.course;
    pageLoad(params.wild, course, course.lo, analytics, dispatch);
  });
</script>

{#if course}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    {#each course.units as unit}
      <UnitCard {unit} />
    {/each}
    <CardDeck los={course.standardLos} />
  </div>
{/if}
