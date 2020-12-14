<script lang="ts">
  import { onMount, getContext } from "svelte";
  import type { Cache } from "../services/course/cache";

  import {navigatorProps, week} from "../services/course/stores";
  import { searchHits, extractPath, findLo, isValid } from "../services/utils/utils-search";
  import type { Lo } from "../services/course/lo";
  import { allLos } from "../services/utils/utils";
  import { push } from 'svelte-spa-router';
  import { highlight_searchTerm } from "../services/value-converters/highlights";

  const cache: Cache = getContext("cache");
  export let params: any = {};

  let search_strings: string[] = [];
  let labs: Lo[] = [];
  let title = "";
  let course;
  let searchTerm = "";

  function initMainNavigator() {
    const navigator = {
      tocShow: true,
      title: {
        title: course.lo.title,
        subTitle: course.lo.properties.credits,
        img: course.lo.img
      },
      parent: {
        show: true,
        icon: "moduleHome",
        link: `#/course/${cache.course.url}`,
        tip: "To module home ...",
      },
      companions: course.companions,
      walls: course.wallBar,
    }
    title = course.lo.title;
    navigatorProps.set(navigator);
    week.set(course.currentWeek);
  }

  onMount(async () => {
    course  = await cache.fetchCourse(params.wild);
    initMainNavigator();
    labs = allLos("lab", course.lo.los);
  });

  const handleClick = ((arg:string) => {
    let path = extractPath(arg);
    logSearch(path);
    push(path);
  });

  const logSearch = ((path) => {
    //let lo = findLo("#" + path, labs);
    //anaylticsService.logSearch(searchTerm, path, this.course, lo);
  });

  $: {
      if(isValid(searchTerm)) {
        search_strings = searchHits(labs, searchTerm);
        search_strings = highlight_searchTerm(search_strings, searchTerm);
      }
    }

</script>

{#if course}
  <div class="uk-container uk-padding-small">
    <h1> Search : {course.lo.title} </h1>
    <div class="uk-container uk-padding-small">
      <fieldset class="uk-fieldset">
        <form class="uk-search uk-search-default uk-width-expand">
          <span uk-search-icon></span>
          <input class="uk-search-input" type="search" placeholder="Search..." bind:value={searchTerm}>
        </form>
        <div>
          <dl>
            {#each search_strings as search_string}
              <dt contenteditable="true" bind:innerHTML={search_string} on:click={() => {handleClick(search_string)}}></dt>
            {/each}
          </dl>
        </div>
      </fieldset>
    </div>
  </div>
{/if}
