<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { location } from "svelte-spa-router";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import type { Lo } from "../services/lo";
  import CardDeck from "../components/card-decks/CardDeck.svelte";
  import { getCouseTitleProps } from "../components/navigators/title-props";
  import { getIconFromType } from "../components/iconography/icons";
  import type { Cache } from "../services/cache";
  export let params: any = {};

  let los: Lo[];
  let course: Course = null;
  const cache: Cache = getContext("cache");

  location.subscribe((value) => {
    if (course) {
      const path = value.substring(6);
      const types = path.split("/");
      los = course.walls.get(types[0]);
      dispatchTitleProps(dispatch, course, types[0]);
    }
  });

  onMount(async () => {
    los = await cache.fetchWall(params.wild);
    course = cache.course;
    const types = params.wild.split("/");
    dispatchTitleProps(dispatch, course, types[0]);
  });

  export function dispatchTitleProps(dispatcher, course: Course, type: string) {
    let titleProps = getCouseTitleProps(course);
    titleProps.title = `All ${type}'s in Module`;
    titleProps.subtitle = course.lo.title;
    titleProps.parentIcon = getIconFromType("moduleHome");
    titleProps.parentTip = "To module home ...";
    titleProps.parentLink = `#/course/${course.url}`;
    dispatcher("routeEvent", titleProps);
  }
</script>

{#if course}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    <CardDeck {los} />
  </div>
{/if}
