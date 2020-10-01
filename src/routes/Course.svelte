<script lang="ts">
  import { onMount, getContext } from "svelte";
  import type { Course } from "../services/course";
  export let params: any = {};

  let course: Course = null;
  let repo: any = getContext("courseRepo");
  let courseRepo = repo.repo;
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
