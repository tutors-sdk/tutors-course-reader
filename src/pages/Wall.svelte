<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import type { Course } from "../services/course/course";
  import type { Lo } from "../services/course/lo";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import type { Cache } from "../services/course/cache";
  import { navigatorProps } from "../services/course/stores";
  import type { AnalyticsService } from "../services/analytics/analytics-service";

  export let params: any = {};

  let los: Lo[];
  let course: Course = null;
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let wallType = "";
  let panelVideos: Lo[] = [];
  let talkVideos: Lo[] = [];
  let title = "";

  function initMainNavigator() {
    navigatorProps.set({
      title: {
        title: `All ${wallType}'s in Module`,
        subTitle: course.lo.title,
        img: cache.course.lo.img
      },
      parent: {
        show: true,
        icon: "moduleHome",
        link: `#/course/${course.url}`,
        tip: "To module home ..."
      }
    });
    title = `All ${wallType}'s in Module`;
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
        analytics.pageLoad(params.wild, cache.course, los[0]);
        initMainNavigator();
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
      analytics.pageLoad(params.wild, cache.course, los[0]);
      initMainNavigator();
      initVideos();
    }
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="container mx-auto">
  {#if course}
    {#if wallType !== 'video'}
      <CardDeck {los} />
    {:else}
      <div class="flex flex-wrap justify-center w-full mt-2 border rounded-lg p-2">
        {#each panelVideos as lo}
          <div class="w-1/2 p-2">
            <VideoCard {lo} />
            <div class="text-sm font-light"> {lo.title} </div>
          </div>
        {/each}
      </div>
      <div class="flex flex-wrap justify-center w-full mt-2 border rounded-lg p-2">
        {#each talkVideos as lo}
          <div class="w-1/4 p-2">
            <VideoCard {lo} />
            <div class="text-sm font-light"> {lo.title} </div>
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>
