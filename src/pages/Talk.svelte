<script lang="ts">
  import { location } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher, getContext } from "svelte";
  import TalkCard from "../components/cards/TalkCard.svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import type { Lo } from "../services/course/lo";
  import type { Cache } from "../services/course/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { titleProps, tocVisible, parent, revealSidebar } from "../services/course/stores";

  export let params: any = {};

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let lo: Lo = null;
  let title = "";

  let refreshPdf = true;

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
    revealSidebar.set(false);
    title = lo.title;
  }

  location.subscribe((value) => {
    if (cache.course) {
      const ref = `/#${value}`;
      lo = cache.course.talks.get(ref);
      if (lo) {
        refreshPdf = !refreshPdf;
        analytics.pageLoad(params.wild, cache.course, lo);
        initMainNav();
      }
    }
  });

  onMount(async () => {
    await cache.fetchCourseFromTalk(params.wild);
    const ref = `/#/talk/${params.wild}`;
    lo = cache.course.talks.get(ref);
    analytics.pageLoad(params.wild, cache.course, lo);
    initMainNav();
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#if lo}
  <div
    class="uk-container-expand uk-margin-medium-top uk-margin-medium-left uk-margin-medium-right"
    in:fade={{ duration: 500 }}>
    <div uk-grid uk-flex uk-flex-center>
      <div class="uk-width-expand@m">
        {#key refreshPdf}
          <TalkCard {lo} />
        {/key}
      </div>
      <div class="uk-width-1-5@m uk-flex uk-grid">
        <TopicNavigatorCard topic={lo.parent} />
      </div>
    </div>
  </div>
{/if}
