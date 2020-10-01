<script lang="ts">
  import { onMount } from "svelte";
  import type { Course } from "../services/course";
  import { getRepo } from "../repo";
  import CardDeck from "../elements/card-decks/CardDeck.svelte";
  export let params: any = {};

  let course: Course = null;
  let courseRepo = getRepo();
  onMount(async () => {
    await courseRepo.fetchCourse(params.wild);
    course = courseRepo.course;
  });
</script>

{#if course}
  <div class="uk-container uk-padding-small">
    <h1>{course.lo.title}</h1>
    <CardDeck los={course.lo.los} />
  </div>
{/if}
