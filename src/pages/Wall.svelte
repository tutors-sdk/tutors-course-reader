<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { location } from "svelte-spa-router";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import type { Lo } from "../services/lo";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import type { Cache } from "../services/cache";
  import { pageLoad } from "../services/page-support/pageload";
  import type { AnalyticsService } from "../services/analytics-service";
  export let params: any = {};

  let los: Lo[];
  let course: Course = null;
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");

  location.subscribe((value) => {
    if (course) {
      const path = value.substring(6);
      const types = path.split("/");
      los = course.walls.get(types[0]);
      if (los && los.length > 0) {
        pageLoad(params.wild, cache.course, los[0], analytics, dispatch, true);
      }
    }
  });

  onMount(async () => {
    los = await cache.fetchWall(params.wild);
    course = cache.course;
    const types = params.wild.split("/");
    if (los && los.length > 0) {
      pageLoad(params.wild, cache.course, los[0], analytics, dispatch, true);
    }
  });
</script>

{#if course}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    <CardDeck {los} />
  </div>
{/if}
