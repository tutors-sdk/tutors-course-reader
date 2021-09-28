<script lang="ts">
  import { push } from "svelte-spa-router";
  import { afterUpdate, getContext, onDestroy } from "svelte";
  import type { Lab } from "../services/course/lab";
  import type { AnalyticsService } from "../services/analytics/analytics-service";
  import { currentLo, revealSidebar } from "../services/course/stores";
  import type { Cache } from "../services/course/cache";
  import * as animateScroll from "svelte-scrollto";
  import { viewDelay } from "../components/animations";

  export let params: any = {};

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let title = "";
  let lab: Lab = null;
  window.addEventListener("keydown", keypressInput);

  let hide = true;
  setTimeout(function() {
    hide = false;
  }, viewDelay);

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

  afterUpdate(async () => {
    animateScroll.scrollToTop();
  });
</script>

<svelte:head>
  <title>{title}</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.18/katex.min.js" integrity="sha512-DAZH0Wu7q9Hnm0Fw8tRZsTeQBzIugiUy6k2r7E0KKMlC2nBvvrNSH/LVnGueCXRfDs5epP+Ieoh3L+VzSKi0Aw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.18/katex.min.css" integrity="sha512-nii0D5CrWiLjtPcfU3pQJifaRLxKKVut/hbsazsodCcIOERZbwLH7dQxzOKy3Ey/Fv8fXCA9+Rf+wQzqklbEJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

{#await getLab(params.wild) then lab}
  {#if !hide}
    <div class="flex">
      <div class="hidden md:block py-1 md:w-3/12 2xl:w-2/12">
        <ul
          class="menu w-3/12 2xl:w-2/12 py-3 shadow-lg bg-neutral text-neutral-content rounded-box fixed overflow-auto h-2/3">
          {@html lab.navbarHtml}
        </ul>
      </div>
      <div id="lab-panel"
           class="justify-end w-full md:w-9/12 2xl:w-10/12 bg-base-200 rounded-box my-1 md:ml-4 2xl:ml-12 text-base-content">
        <header class="md:hidden bg-neutral p-4 text-neutral-content rounded-box mb-4">
          <nav class="flex flex-wrap justify-between">
            {@html lab.horizontalNavbarHtml}
          </nav>
        </header>
        <article class="prose max-w-auto xl:max-w-3xl 2xl:max-w-5xl mx-auto p-2 m-4">
          {@html lab.content}
        </article>
      </div>
    </div>
  {/if}
{/await}

