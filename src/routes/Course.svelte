<script lang="ts">
  import { onMount } from "svelte";
  import type { Course } from "../services/course";
  import { getRepo } from "../repo";
  export let params: any = {};

  let course: Course = null;
  let courseRepo = getRepo();
  onMount(async () => {
    await courseRepo.fetchCourse(params.wild);
    course = courseRepo.course;
  });
</script>

<h1>Course</h1>
{#if course}
  <main>
    <h3>Course Title: {course.lo.title}</h3>
    <ul>
      {#each course.lo.los as lo}
        <li><a href={lo.route}>{lo.title}</a></li>
      {/each}
    </ul>
  </main>
{/if}
