<script lang="ts">
  import { fly } from "svelte/transition";
  import { onMount, getContext, beforeUpdate } from "svelte";
  import type { Course } from "../services/course";
  import type { Cache } from "../services/cache";
  import CourseNavigator from "../elements/navigators/CourseNavigator.svelte";
  export let show = false;
  let course: Course = null;
  const cache: Cache = getContext("cache");

  let display = false;
  beforeUpdate(() => {
    course = cache.course;
    if (course) {
      display = true;
    }
  });
</script>

<style>
  nav {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    padding: 2rem 1rem 0.6rem;
    border-left: 1px solid #aaa;
    background: #fff;
    overflow-y: auto;
    width: 20rem;
  }
</style>

{#if show}
  <nav transition:fly={{ x: 250, opacity: 1 }}>
    {#if display}
      <CourseNavigator {course} />
    {/if}
  </nav>
{/if}
