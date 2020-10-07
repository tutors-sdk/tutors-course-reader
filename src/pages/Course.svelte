<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import CardDeck from "../components/card-decks/CardDeck.svelte";
  import { getCouseTitleProps } from "../components/navigators/title-props";
  import type { Cache } from "../services/cache";
  export let params: any = {};

  let course: Course = null;
  const cache: Cache = getContext("cache");

  onMount(async () => {
    console.log(params.wild);
    await cache.fetchCourse(params.wild);
    course = cache.course;
    dispatchTitleProps(dispatch, course);
  });
  function dispatchTitleProps(dispatcher, course: Course) {
    dispatcher("routeEvent", getCouseTitleProps(course));
  }
</script>

{#if course}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    <CardDeck los={course.lo.los} />
  </div>
{/if}
