<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import CardDeck from "../elements/card-decks/CardDeck.svelte";
  import { dispatchCourseNavProps } from "../elements/navigators/navigator-properties";
  import type { CourseRepo } from "../services/course-repo";
  export let params: any = {};

  let course: Course = null;
  const courseRepo: CourseRepo = getContext("courseRepo");
  onMount(async () => {
    await courseRepo.fetchCourse(params.wild);
    course = courseRepo.course;
    dispatchCourseNavProps(dispatch, course);
  });
</script>

{#if course}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    <CardDeck los={course.lo.los} />
  </div>
{/if}
