<script lang="ts">
  import { fly } from "svelte/transition";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import { getContext, beforeUpdate } from "svelte";
  import type { Course } from "../../services/course/course";
  import type { Cache } from "../../services/course/cache";
  import CourseNavigator from "./CourseNavigator.svelte";
  import { revealSidebar } from "../../services/course/stores";

  let course: Course = null;
  const cache: Cache = getContext("cache");

  let display = false;
  beforeUpdate(() => {
    course = cache.course;
    if (course) {
      display = true;
    }
  });
  let close = function () {
    revealSidebar.set(false);
  };
</script>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    padding: 2rem 1rem 0.6rem;
    border-left: 1px solid #aaa;
    background: black;
    overflow-y: auto;
    width: 20rem;
  }
  button {
    border: none;
  }
</style>

{#if $revealSidebar}
  <nav transition:fly={{ x: -250, opacity: 1 }}>
    {#if display}
      <button class="uk-button uk-button-secondary uk-position-top-right" title="Close TOC" on:click={close} uk-tooltip>
        <Icon data={getIconFromType('close')} scale="1" />
      </button>
      <CourseNavigator {course} />
    {/if}
  </nav>
{/if}
