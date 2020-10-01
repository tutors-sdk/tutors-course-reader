<script lang="ts">
  import { onMount } from "svelte";
  import type { Course } from "./services/course";
  import { CourseRepo } from "./services/course-repo";

  let course: Course = null;
  let courseRepo = new CourseRepo();
  onMount(async () => {
    await courseRepo.fetchCourse("wit-hdip-comp-sci-2020-web-development.netlify.app");
    course = courseRepo.course;
  });
</script>

{#if course}
  <main>
    <h3>Course Title: {course.lo.title}</h3>
    <ul>
      {#each course.lo.los as lo}
        <li>{lo.title}</li>
      {/each}
    </ul>
  </main>
{/if}
