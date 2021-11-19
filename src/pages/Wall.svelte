<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Course } from "tutors-reader-lib/src/course/course";
  import type { Lo } from "tutors-reader-lib/src//course/lo";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import type { CourseService } from "../services/course-service";
  import { currentLo } from "../stores";
  import type { AnalyticsService } from "../services/analytics-service";
  // @ts-ignore
  import * as animateScroll from "svelte-scrollto";
  import { viewDelay } from "../components/animations";

  export let params: any = {};

  let los: Lo[];
  let course: Course = null;
  const cache: CourseService = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let wallType = "";
  let panelVideos: Lo[] = [];
  let talkVideos: Lo[] = [];
  let title = "";

  let hide = false;

  async function getWall(url) {
    wallType = params.wild;
    los = await cache.fetchWall(params.wild);
    hide = true;
    setTimeout(() => {
      hide = false;
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
    }, viewDelay);
    return los;
  }

  function initVideos() {
    if (wallType === "video") {
      panelVideos = los.filter((lo) => lo.type === "panelvideo");
      talkVideos = los.filter((lo) => lo.type !== "panelvideo");
    }
  }

  onMount(async () => {
    animateScroll.scrollTo({ delay: 200, element: "#top" });
  });

</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#await getWall(params.wild) then lo}
  {#if !hide}
    <div class="">
      {#if wallType !== 'video'}
        <CardDeck {los} />
      {:else}
        <div class="wall-bg">
          {#each panelVideos as lo}
            <div class="w-1/2 p-2">
              <VideoCard {lo} />
            </div>
          {/each}
        </div>
        <div class="wall-bg">
          {#each talkVideos as lo}
            <div class="w-1/4 p-2">
              <VideoCard {lo} />
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
{/await}

