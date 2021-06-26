<script lang="ts">
  import { location, replace, push } from "svelte-spa-router";
  import { getContext, onDestroy, onMount } from "svelte";
  import type { Lab } from "../services/course/lab";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { navigatorProps } from "../services/course/stores";
  import type { Cache } from "../services/course/cache";
  import type { Lo } from "../services/course/lo";

  export let params: any = {};

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let title = "";
  let vertical = true;
  let verticalIcon = "switchOff";
  let lab: Lab = null;
  let refreshStep = false;

  function initMainNavigator(lo: Lo) {
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
      },
      lo: lo
    });
    title = lab.lo.title;
  }

  onMount(async () => {
    const lastSegment = params.wild.substr(params.wild.lastIndexOf("/") + 1);
    lab = await cache.fetchLab(params.wild);
    analytics.pageLoad(params.wild, cache.course, lab.lo);
    initMainNavigator(lab.lo);
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
        initMainNavigator(lab.lo);
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
      initMainNavigator(lab.lo);
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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/katex.min.css" integrity="sha384-t5CR+zwDAROtph0PXGte6ia8heboACF9R5l/DiY+WZ3P2lxNgvJkQk5n7GPvLMYw" crossorigin="anonymous">
</svelte:head>

{#if lab}
  <div class="container mx-auto flex my-4">
    <div class="hidden md:block flex flex-col w-1/6 py-2 artboard">
      {#key refreshStep}
        <ul class="menu py-3 shadow-lg bg-neutral text-neutral-content rounded-box">
          {@html lab.navbarHtml}
        </ul>
      {/key}
    </div>
    <div id="lab-panel" class="flex-1 py-4 bg-base-100 text-base-content">
      {#key refreshStep}
        <header class="px-4 text-base-content">
          <nav class="flex justify-between">
            {@html lab.horizontalNavbarHtml}
          </nav>
          <hr class="border-gray-200 mt-4 mb-2" />
        </header>
        <article class="prose max-w-none p-4">
          {@html lab.content}
        </article>
      {/key}
    </div>
  </div>
{/if}
