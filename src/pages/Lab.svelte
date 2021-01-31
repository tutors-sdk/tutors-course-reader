<script lang="ts">
  import { location, replace, push } from "svelte-spa-router";
  import { getContext, onDestroy, onMount } from "svelte";
  import type { Lab } from "../services/course/lab";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { navigatorProps } from "../services/course/stores";
  import type { Cache } from "../services/course/cache";

  export let params: any = {};

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let title = "";
  let vertical = true;
  let verticalIcon = "switchOff";
  let lab: Lab = null;
  let refreshStep = false;

  function initMainNavigator() {
    navigatorProps.set({
      title: {
        title: lab.lo.title,
        subTitle: cache.course.lo.title,
        img: lab.lo.img
      },
      parent: {
        show: true,
        icon: "topic",
        link: lab.lo.parent.lo.route,
        tip: "To parent topic ..."
      }
    });
    title = lab.lo.title;
  }

  onMount(async () => {
    const lastSegment = params.wild.substr(params.wild.lastIndexOf("/") + 1);
    lab = await cache.fetchLab(params.wild);
    analytics.pageLoad(params.wild, cache.course, lab.lo);
    initMainNavigator();
    if (lastSegment.startsWith("book")) {
      lab.setFirstPageActive();
    } else {
      lab.setActivePage(lastSegment);
    }
    window.addEventListener("keydown", keypressInput);
  });

  const unsubscribe = location.subscribe((value) => {
    if (lab) {
      if (value.startsWith("/lab/") && !value.includes(lab.url)) {
        lab = cache.getLab(value)
        initMainNavigator();
        lab.setFirstPageActive();
        refreshStep = !refreshStep;
        analytics.pageLoad(value, cache.course, lab.lo);
      }
    }

    const step = value.substr(value.lastIndexOf("/") + 1);
    refreshStep = !refreshStep;
    const labPanel = document.getElementById("lab-panel");
    if (labPanel) labPanel.scrollTop = 0;
    if (lab) {
      analytics.pageLoad(params.wild, cache.course, lab.lo);
      initMainNavigator();
      lab.setActivePage(step);
    }
  });

  function keypressInput(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      let step = lab.nextStep();
      if (step) push(`/lab/${lab.url}/${step}`);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      let step = lab.prevStep();
      if (step) push(`/lab/${lab.url}/${step}`);
    }
  }

  onDestroy(async () => {
    window.removeEventListener("keydown", keypressInput);
    unsubscribe();
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#if lab}
  <div class="flex w-full h-screen mt-4">
    <div class="hidden md:block flex flex-col w-1/6  border rounded-md bg-gray-800 text-white p-4 overflow-hidden">
      {#key refreshStep}
        <ul>
          {@html lab.navbarHtml}
        </ul>
      {/key}
    </div>
    <div id="lab-panel" class="w-full overflow-y-scroll">
      {#key refreshStep}
        <header class="px-4">
          <nav class="flex justify-between">
            {@html lab.horizontalNavbarHtml}
          </nav>
          <hr class="border-gray-200 mt-4 mb-2" />
        </header>
        <article class="prose prose-sm max-w-none p-4 dark:prose-dark">
          {@html lab.content}
        </article>
      {/key}
    </div>
  </div>
{/if}
