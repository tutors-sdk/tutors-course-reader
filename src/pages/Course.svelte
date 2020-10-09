<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import UnitCard from "../components/cards/UnitCard.svelte";
  import { getCouseTitleProps } from "../components/navigators/title-props";
  import type { Cache } from "../services/cache";
  import { checkAuth } from "../services/auth-service";
  export let params: any = {};

  let course: Course = null;
  const cache: Cache = getContext("cache");

  onMount(async () => {
    await cache.fetchCourse(params.wild);
    course = cache.course;
    checkAuth(course, "course");
    dispatchTitleProps(dispatch, course);
  });
  function dispatchTitleProps(dispatcher, course: Course) {
    dispatcher("routeEvent", getCouseTitleProps(course));
  }
</script>

{#if course}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    {#each course.units as unit}
      <UnitCard {unit} />
    {/each}
    <CardDeck los={course.standardLos} />
  </div>
{/if}
