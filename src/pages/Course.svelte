<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import type { Course } from "../services/course/course";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import UnitCard from "../components/cards/UnitCard.svelte";
  import type { Cache } from "../services/course/cache";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { navigatorProps } from "../services/course/stores";
  import type { Lo } from "../services/course/lo";

  export let params: any = {};

  let course: Course = null;
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let displayCourse = true;
  let title = "";

  let standardDeck = true;
  let pinBuffer = "";
  let ignorePin = "";

  let refresh = false;

  function initMainNavigator(lo: Lo) {
    navigatorProps.set({
      title: {
        title: course.lo.title,
        subTitle: course.lo.properties.credits,
        img: course.lo.img
      },
      parent: {
        show: course.lo.properties.parent != null,
        link: `#/${course.lo.properties.parent}`,
        icon: "programHome",
        tip: "To programme home ..."
      },
      lo: lo
    });
    title = course.lo.title;
  }

  function loadCourse(url: string) {
    cache.fetchCourse(url).then((newCourse: Course) => {
      course = newCourse;
      refresh = !refresh;
      initMainNavigator(course.lo);
      analytics.pageLoad(url, course, course.lo);
      displayCourse = !displayCourse;
      if (course.lo.properties.ignorepin) {
        ignorePin = "" + course.lo.properties.ignorepin;
      }
    });
  }

  onMount(async () => {
    loadCourse(params.wild);
    window.addEventListener("keydown", keypressInput);
  });

  function keypressInput(e) {
    pinBuffer = pinBuffer.concat(e.key);
    if (pinBuffer === ignorePin) {
      course.showAllLos();
      standardDeck = false;
    }
  }

  onDestroy(async () => {
    window.removeEventListener("keydown", keypressInput);
  });

  const unsubscribe = location.subscribe((value) => {
    if (value.startsWith("/course")) {
      let newCourseUrl = value.substring(8);
      if (course && course.url != newCourseUrl) {
        loadCourse(newCourseUrl);
      }
    }
  });
  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="container mx-auto p-4">
  {#key refresh}
    {#if course}
      {#each course.units as unit}
        <UnitCard {unit} />
      {/each}
      {#if standardDeck}
        <CardDeck los={course.standardLos} />
      {:else}
        <CardDeck los={course.allLos} />
      {/if}
    {/if}
  {/key}
</div>


