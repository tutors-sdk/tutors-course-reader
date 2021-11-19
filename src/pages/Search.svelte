<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { CourseService } from "../services/course-service";
  import { currentLo } from "../stores";
  import { extractPath, isValid, searchHits } from "tutors-reader-lib/src/utils/search-utils";
  import type { Lo } from "tutors-reader-lib/src/course/lo";
  import { allLos } from "tutors-reader-lib/src/utils/lo-utils";
  import { push } from "svelte-spa-router";
  import { highlight_searchTerm } from "tutors-reader-lib/src/utils/search-utils";

  const cache: CourseService = getContext("cache");
  export let params: any = {};

  let search_strings: string[] = [];
  let labs: Lo[] = [];
  let title = "";
  let course;
  let searchTerm = "";

  onMount(async () => {
    course = await cache.fetchCourse(params.wild);
    currentLo.set(course.lo);
    title = course.lo.title;
    labs = allLos("lab", course.lo.los);
  });

  const handleClick = ((arg: string) => {
    let path = extractPath(arg);
    push(path);
  });

  $: {
    if (isValid(searchTerm)) {
      search_strings = searchHits(labs, searchTerm);
      search_strings = highlight_searchTerm(search_strings, searchTerm);
    }
  }

</script>

{#if course}
  <div class="container mx-auto">
    <div class="card border rounded-md p-4 my-4">
      <label for="search" class="block text-base-content p-2">Enter search term:</label>
      <div class="mt-1 border#">
        <input bind:value={searchTerm} type="text" name="email" id="search" class="p-1 block w-full sm:text-sm border"
               placeholder="...">
      </div>
      <div class="ml-4">
        <ul class="list-disc list-outside">
          {#each search_strings as search_string}
            <li class="p-2 hover:bg-white dark:text-gray-500" contenteditable="true" bind:innerHTML={search_string}
                on:click={() => {handleClick(search_string)}}></li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
{/if}
