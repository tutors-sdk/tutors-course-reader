<script lang="ts">
  import { onMount } from "svelte";
  import { Course } from "./services/course";

  let course: Course = null;
  onMount(async () => {
    const url = "https://wit-hdip-comp-sci-2020-web-development.netlify.app/tutors.json";
    await fetch(url)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        course = new Course(url);
        course.init(data, url);
      });
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
