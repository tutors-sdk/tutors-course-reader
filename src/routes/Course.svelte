<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import CardDeck from "../elements/card-decks/CardDeck.svelte";
  import { dispatchCourseNavProps } from "../elements/navigators/navigator-properties";
  import type { Cache } from "../services/cache";
  export let params: any = {};

  let course: Course = null;
  const cache: Cache = getContext("cache");
  onMount(async () => {
    await cache.fetchCourse(params.wild);
    course = cache.course;
    dispatchCourseNavProps(dispatch, course);
  });
</script>

{#if course}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    <CardDeck los={course.lo.los} />
  </div>
{/if}
