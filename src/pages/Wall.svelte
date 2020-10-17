<script lang="ts">
  import { onMount, getContext } from "svelte";
  import { location } from "svelte-spa-router";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();
  import type { Course } from "../services/course";
  import type { Lo } from "../services/lo";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import type { Cache } from "../services/course/cache";
  import { titleProps, parent } from "../services/course/stores";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  export let params: any = {};

  let los: Lo[];
  let course: Course = null;
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let wallType = "";
  let panelVideos: Lo[] = [];
  let talkVideos: Lo[] = [];

  function initMainNav() {
    titleProps.set({
      title: `All ${wallType}'s in Module`,
      subTitle: course.lo.title,
      img: cache.course.lo.img,
    });
    parent.set({
      visible: true,
      icon: "moduleHome",
      link: `#/course/${course.url}`,
      tip: "To module home ...",
    });
  }

  function initVideos() {
    if (wallType === "video") {
      panelVideos = los.filter((lo) => lo.type === "panelvideo");
      talkVideos = los.filter((lo) => lo.type !== "panelvideo");
    }
  }

  location.subscribe((value) => {
    if (course) {
      const path = value.substring(6);
      const types = path.split("/");
      wallType = types[0];
      los = course.walls.get(types[0]);
      if (los && los.length > 0) {
        analytics.pageLoad(params.wild, cache.course, los[0], true);
        initMainNav();
        initVideos();
      }
    }
  });

  onMount(async () => {
    wallType = params.wild;
    los = await cache.fetchWall(params.wild);
    course = cache.course;
    const types = params.wild.split("/");
    wallType = types[0];
    if (los && los.length > 0) {
      pageLoad(params.wild, cache.course, los[0], analytics, true);
      initVideos();
    }
  });
</script>

{#if course}
  <div class="uk-container uk-padding-small" in:fade={{ duration: 500 }}>
    {#if wallType !== 'video'}
      <CardDeck {los} />
    {:else}
      {#each panelVideos as lo}
        <VideoCard {lo} />
        <hr class="uk-divider" />
      {/each}
      <div class="uk-child-width-1-2@s uk-flex uk-flex-center" uk-grid>
        {#each talkVideos as lo}
          <div>
            <VideoCard {lo} />
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}
