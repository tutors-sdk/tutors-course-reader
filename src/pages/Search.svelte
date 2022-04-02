<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { CourseService } from "../reader-lib/services/course-service";
  import { currentLo } from "../stores";
  import { extractPath, isValid, ResultType, searchHits } from "../reader-lib/utils/search-utils";
  import type { Lo } from "../reader-lib/types/lo-types";
  import { allLos } from "../reader-lib/utils/lo-utils";
  import { push } from "svelte-spa-router";
  import { convertMd } from "../reader-lib/utils/markdown-utils";

  const cache: CourseService = getContext("cache");
  export let params: any = {};
  let search_strings: string[] = [];
  let labs: Lo[] = [];
  let title = "";
  let course;
  let searchTerm = "";
  let searchResults: ResultType[] = [];

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

  function transformResults(results: ResultType[]) {
    results.forEach(result => {
      let resultStrs: string[] = [];
      if (result.fenced) {
        resultStrs.push(`~~~${result.language}`);
      }
      resultStrs.push(result.contentMd);
      if (result.fenced) {
        resultStrs.push("~~~");
      }
      result.html = convertMd(resultStrs.join("\n"), course.url);
      result.link = `https://reader.tutors.dev/${result.link}`;
      console.log(result);
    });
  }

  $: {
    if (isValid(searchTerm)) {
      searchResults = searchHits(labs, searchTerm);
      transformResults(searchResults);
      push(searchTerm);
    }
  }
</script>
{#if course}
  <div class="container mx-auto">
      <label for="search" class="block text-xl text-base-content p-2">Enter search term:</label>
      <div class="mt-1 border">
        <input bind:value={searchTerm} type="text" name="email" id="search" class="input input-bordered w-full"
               placeholder="...">
      </div>
      <div>
        {#each searchResults as result}
          <div class="border-2 rounded-2xl">
          <div class="labsearchresult ">
            <div>
              {@html result.html}
            </div>
            <div class="text-right text-sm">
              <a href="{result.link}" target="_blank">
                {result.title}
              </a>
            </div>
          </div>
          </div>
        {/each}
      </div>
  </div>
{/if}
<style>
  :global(.labsearchresult pre) {
    color : white;
  }
</style>
