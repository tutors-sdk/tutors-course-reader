<script lang="ts">
  import { fly } from "svelte/transition";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../components/iconography/icons";
  import { onMount, getContext, beforeUpdate } from "svelte";
  import type { Course } from "../services/course";
  import type { Cache } from "../services/cache";
  import CourseNavigator from "../components/navigators/CourseNavigator.svelte";
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
  let close = function () {
    show = false;
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
    background: #fff;
    overflow-y: auto;
    width: 20rem;
  }
  button {
    border: none;
  }
</style>

{#if show}
  <nav transition:fly={{ x: -250, opacity: 1 }}>
    {#if display}
      <button class="uk-button uk-button-default uk-position-top-right" title="Close TOC" on:click={close} uk-tooltip>
        <Icon data={getIconFromType('close')} scale="1" />
      </button>
      <CourseNavigator {course} />
    {/if}
  </nav>
{/if}
