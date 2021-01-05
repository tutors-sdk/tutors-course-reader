<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Cache } from "../services/course/cache";
  import { navigatorProps, week } from "../services/course/stores";
  import { extractPath, isValid, searchHits } from "../services/utils/utils-search";
  import type { Lo } from "../services/course/lo";
  import { allLos } from "../services/utils/utils";
  import { push } from "svelte-spa-router";
  import { highlight_searchTerm } from "../services/value-converters/highlights";

  const cache: Cache = getContext("cache");
  export let params: any = {};

  let search_strings: string[] = [];
  let labs: Lo[] = [];
  let title = "";
  let course;
  let searchTerm = "";

  function initMainNavigator() {
    navigatorProps.set({
      title: {
        title: course.lo.title,
        subTitle: course.lo.properties.credits,
        img: course.lo.img
      },
      parent: {
        show: true,
        icon: "moduleHome",
        link: `#/course/${cache.course.url}`,
        tip: "To module home ..."
      },
    });
    title = course.lo.title;
  }

  onMount(async () => {
    course = await cache.fetchCourse(params.wild);
    initMainNavigator();
    labs = allLos("lab", course.lo.los);
  });

  const handleClick = ((arg: string) => {
    let path = extractPath(arg);
    logSearch(path);
    push(path);
  });

  const logSearch = ((path) => {
    //let lo = findLo("#" + path, labs);
    //anaylticsService.logSearch(searchTerm, path, this.course, lo);
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
    <div class="border rounded-md p-4 my-4">
      <label for="search" class="block text-base font-light text-gray-700 p-2 dark:text-white">Enter search
        term:</label>
      <div class="mt-1 border dark:text-gray-500">
        <input bind:value={searchTerm} type="text" name="email" id="search"
               class="p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ext-gray-500"
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
