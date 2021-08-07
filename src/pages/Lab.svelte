<script lang="ts">
  import { push } from "svelte-spa-router";
  import { getContext, onDestroy } from "svelte";
  import type { Lab } from "../services/course/lab";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { currentLo, revealSidebar } from "../services/course/stores";
  import type { Cache } from "../services/course/cache";

  export let params: any = {};

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let title = "";
  let lab: Lab = null;
  window.addEventListener("keydown", keypressInput);

  async function getLab(url) {
    revealSidebar.set(false);
    let encoded = encodeURI(params.wild);
    const lastSegment = encoded.substr(params.wild.lastIndexOf("/") + 1);
    lab = await cache.fetchLab(params.wild);
    analytics.pageLoad(params.wild, cache.course, lab.lo);
    // noinspection TypeScriptValidateTypes
    currentLo.set(lab.lo);
    title = lab.lo.title;
    if (lastSegment.startsWith("book")) {
      lab.setFirstPageActive();
    } else {
      lab.setActivePage(lastSegment);
     }
    return lab;
  }

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
  });
</script>
guj
<svelte:head>
  <title>{title}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/katex.min.css"
        integrity="sha384-t5CR+zwDAROtph0PXGte6ia8heboACF9R5l/DiY+WZ3P2lxNgvJkQk5n7GPvLMYw" crossorigin="anonymous">
</svelte:head>

{#await getLab(params.wild) then lab}
  <div class="container mx-auto flex my-4">
    <div class="hidden md:block flex flex-col w-1/6 py-2 artboard">
      <ul class="menu py-3 shadow-lg bg-neutral text-neutral-content rounded-box">
        {@html lab.navbarHtml}
      </ul>
    </div>
    <div id="lab-panel" class="flex-1 py-4 bg-base-100 text-base-content">
      <header class="px-4 text-base-content">
        <nav class="flex justify-between">
          {@html lab.horizontalNavbarHtml}
        </nav>
        <hr class="border-gray-200 mt-4 mb-2" />
      </header>
      <article class="prose max-w-none p-4">
        {@html lab.content}
      </article>
    </div>
  </div>
{/await}
