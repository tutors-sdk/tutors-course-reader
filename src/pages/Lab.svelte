<script lang="ts">
  import { location } from "svelte-spa-router";
  import { createEventDispatcher, getContext } from "svelte";
  const dispatch = createEventDispatcher();
  import Icon from "svelte-awesome";
  import { onMount, onDestroy } from "svelte";
  import type { Cache } from "../services/course/cache";
  export let params: any = {};
  import type { Lab } from "../services/course/lab";
  import { fade } from "svelte/transition";
  import { getIconFromType } from "../components/iconography/icons";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import {navigatorProps, revealSidebar, week} from "../services/course/stores";

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let title = "";
  let vertical = true;
  let verticalIcon = "switchOff";
  let lab: Lab = null;
  let refreshStep = false;

  function initMainNavigator() {
    const navigator = {
      tocShow: false,
      title: {
        title: lab.lo.title,
      subTitle: cache.course.lo.title,
      img: lab.lo.img,
      },
      parent: {
        show: true,
        icon: "topic",
          link: lab.lo.parent.lo.route,
          tip: "To parent topic ..."
      },
      companions: cache.course.companions,
      walls: cache.course.wallBar,
    }
    title = lab.lo.title;
    revealSidebar.set(false);
    navigatorProps.set(navigator)
    week.set(cache.course.currentWeek);
  }

  onMount(async () => {
    lab = await cache.fetchLab(params.wild);
    analytics.pageLoad(params.wild, cache.course, lab.lo);
    initMainNavigator();
    if (localStorage.labVertical) {
      if (localStorage.labVertical == "false") {
        vertical = false;
      } else {
        vertical = true;
      }
      lab.vertical = vertical;
      lab.refreshNav();
    }
  });

  const unsubscribe = location.subscribe((value) => {
    const step = value.substr(value.lastIndexOf("/") + 1);
    refreshStep = !refreshStep;
    if (lab) {
      analytics.pageLoad(params.wild, cache.course, lab.lo);
      initMainNavigator();
      lab.setActivePage(step);
    }
  });

  onDestroy(unsubscribe);
</script>


<svelte:head>
  <title>{title}</title>
</svelte:head>

{#if lab}
  <div class="flex w-full h-screen">
    <div class="w-1/6  bg-gray-800 text-white p-4 mt-24">
      {#key refreshStep}
        {@html lab.navbarHtml}
      {/key}
    </div>
    <div class="w-full overflow-y-scroll mt-24">
      {#key refreshStep}
        <article class="prose prose-sm bg-white max-w-none p-4">
          {@html lab.content}
        </article>
      {/key}
    </div>
  </div>
{/if}
