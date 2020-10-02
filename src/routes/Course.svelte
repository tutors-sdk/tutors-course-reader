<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import { dispatchCourseNavProps, getRepo } from "../repo";
  import CardDeck from "../elements/card-decks/CardDeck.svelte";
  export let params: any = {};

  let course: Course = null;
  let courseRepo = getRepo();
  onMount(async () => {
    await courseRepo.fetchCourse(params.wild);
    course = courseRepo.course;
    dispatchCourseNavProps(dispatch, course);
  });
</script>

{#if course}
  <div class="uk-container uk-padding-small">
    <CardDeck los={course.lo.los} />
  </div>
{/if}
