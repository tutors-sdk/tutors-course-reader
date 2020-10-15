<script lang="ts">
  import { location } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  import { createEventDispatcher, getContext } from "svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import type { Lo } from "../services/lo";
  import type { Cache } from "../services/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import VideoCard from "../components/cards/VideoCard.svelte";
  import type { AnalyticsService } from "../services/analytics-service";
  import { pageLoad, titleProps, tocVisible, parent } from "../services/page-store";
  export let params: any = {};

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let lo: Lo = null;
  let refreshVideo = true;

  function initMainNav() {
    titleProps.set({
      title: lo.title,
      subTitle: cache.course.lo.title,
      img: lo.img,
    });
    tocVisible.set(true);
    parent.set({
      visible: true,
      icon: "topic",
      link: lo.parent.lo.route,
      tip: "To parent topic ...",
    });
  }

  location.subscribe((value) => {
    if (cache.course) {
      const ref = `/#${value}`;
      lo = cache.course.videos.get(ref);
      if (lo) {
        refreshVideo = !refreshVideo;
        pageLoad(params.wild, cache.course, lo, analytics);
        initMainNav();
      }
    }
  });

  onMount(async () => {
    await cache.fetchCourseFromTalk(params.wild);
    const ref = `/#/video/${params.wild}`;
    lo = cache.course.videos.get(ref);
    pageLoad(params.wild, cache.course, lo, analytics);
  });
</script>

{#if lo}
  <div
    class="uk-container-expand uk-margin-medium-top uk-margin-medium-left uk-margin-medium-right"
    in:fade={{ duration: 500 }}>
    <div uk-grid uk-flex uk-flex-center>
      <div class="uk-width-expand@m">
        {#key refreshVideo}
          <VideoCard {lo} />
        {/key}
      </div>
      <div class="uk-width-1-5@m uk-flex uk-grid">
        <TopicNavigatorCard topic={lo.parent} />
      </div>
    </div>
  </div>
{/if}
