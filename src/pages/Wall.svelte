<script lang="ts">
  import { getContext } from "svelte";
  import type { Course } from "../services/course/course";
  import type { Lo } from "../services/course/lo";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import type { Cache } from "../services/course/cache";
  import { currentLo } from "../services/course/stores";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { viewDelay } from "../components/animations";

  export let params: any = {};

  let los: Lo[];
  let course: Course = null;
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let wallType = "";
  let panelVideos: Lo[] = [];
  let talkVideos: Lo[] = [];
  let title = "";

  let hide = true;
  setTimeout(function() {
    hide = false;
  }, viewDelay);

  async function getWall(url) {
    wallType = params.wild;
    los = await cache.fetchWall(params.wild);
    course = cache.course;
    const types = params.wild.split("/");
    wallType = types[0];
    if (los && los.length > 0) {
      analytics.pageLoad(params.wild, cache.course, los[0]);
      // noinspection TypeScriptValidateTypes
      currentLo.set({
        title: `All ${wallType}s in Module`,
        type: wallType,
        parentLo: course.lo,
        img: course.lo.img,
        route: `#/wall/${url}`
      });
      title = `All ${wallType}s in Module`;
      initVideos();
    }
    return los;
  }

  function initVideos() {
    if (wallType === "video") {
      panelVideos = los.filter((lo) => lo.type === "panelvideo");
      talkVideos = los.filter((lo) => lo.type !== "panelvideo");
    }
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
{#if !hide}
{#await getWall(params.wild) then lo}

    <div class="container mx-auto">
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
    </div>

{/await}
{/if}
