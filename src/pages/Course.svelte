<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { onMount, onDestroy, getContext } from "svelte";
  import { location } from "svelte-spa-router";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import UnitCard from "../components/cards/UnitCard.svelte";
  import type { Cache } from "../services/cache";
  import type { AnalyticsService } from "../services/analytics-service";
  import { pageLoad, titleProps, tocVisible, parent } from "../services/page-store";
  export let params: any = {};

  let course: Course = null;
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let displayCourse = true;

  let standardDeck = true;
  let pinBuffer = "";
  let ignorePin = "";

  function initMainNav() {
    titleProps.set({
      title: course.lo.title,
      subTitle: course.lo.properties.credits,
      img: course.lo.img,
    });
    tocVisible.set(true);
    parent.set({
      visible: course.lo.properties.parent != null,
      icon: "programHome",
      link: `#/${course.lo.properties.parent}`,
      tip: "To programme home ...",
    });
  }

  function keypressInput(e) {
    pinBuffer = pinBuffer.concat(e.key);
    if (pinBuffer === ignorePin) {
      course.showAllLos();
      standardDeck = false;
    }
  }

  function loadCourse(url: string) {
    cache.fetchCourse(url).then((newCourse: Course) => {
      if (newCourse.lo) {
        course = newCourse;
        initMainNav();
        pageLoad(url, course, course.lo, analytics);
        displayCourse = !displayCourse;
        if (course.lo.properties.ignorepin) {
          ignorePin = "" + course.lo.properties.ignorepin;
        }
      }
    });
  }

  onMount(async () => {
    loadCourse(params.wild);
    window.addEventListener("keydown", keypressInput);
  });

  onDestroy(async () => {
    window.removeEventListener("keypress", keypressInput);
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

{#key displayCourse}
  {#if course}
    <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
      {#each course.units as unit}
        <UnitCard {unit} />
      {/each}
      {#if standardDeck}
        <CardDeck los={course.standardLos} />
      {:else}
        <CardDeck los={course.allLos} />
      {/if}
    </div>
  {/if}
{/key}
