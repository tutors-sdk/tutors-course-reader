<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import {fade} from 'svelte/transition'
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import { getRepo } from "../repo";
  import CardDeck from "../elements/card-decks/CardDeck.svelte";
  import { dispatchCourseNavProps } from "../elements/navigators/navigator-properties";
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
  <div class="uk-container uk-padding-small" in:fade="{{duration: 500}}">
    <CardDeck los={course.lo.los} />
  </div>
{/if}
