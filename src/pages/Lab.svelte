<script lang="ts">
  import { push } from "svelte-spa-router";
  import { afterUpdate, getContext, onDestroy } from "svelte";
  import type { Lab } from "../reader-lib/models/lab";
  import type { AnalyticsService } from "../reader-lib/services/analytics-service";
  import { currentLo, revealSidebar } from "../stores";
  import type { CourseService } from "../reader-lib/services/course-service";
  // @ts-ignore
  import * as animateScroll from "svelte-scrollto";
  import { viewDelay } from "../components/animations";
  import { fade, fly, slide, draw } from 'svelte/transition';

  export let params: any = {};

  const cache: CourseService = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let title = "";
  let lab: Lab = null;
  window.addEventListener("keydown", keypressInput);
  window.addEventListener("mousedown", mouseClick);

  let hide = true;
  setTimeout(function() {
    hide = false;
  }, viewDelay);

  let mostRecentLab = "";
  function removeLastDirectory(the_url) {
    var the_arr = the_url.split('/');
    let lastSegment = the_arr.pop();
    if (lastSegment.startsWith("book")) {
      return the_url;
    }
    return the_arr.join('/');
  }

  async function getLab(url) {
    revealSidebar.set(false);
    let encoded = encodeURI(params.wild);
    const lastSegment = encoded.substr(params.wild.lastIndexOf("/") + 1);

    if (mostRecentLab === "") {
      mostRecentLab = removeLastDirectory(params.wild);
      lab = await cache.fetchLab(params.wild);
    } else {
      let thisLab = removeLastDirectory(params.wild)
      if (mostRecentLab !== thisLab) {
        lab = await cache.fetchLab(params.wild);
      }
    }
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

  let direction = 0;

  function mouseClick (e) {
    direction = 0;
  }

  function keypressInput(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      direction = 400;
      e.preventDefault();
      let step = lab.nextStep();
      if (step) push(`/lab/${lab.url}/${step}`);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      direction = -150;
      e.preventDefault();
      let step = lab.prevStep();
      if (step) push(`/lab/${lab.url}/${step}`);
    }
  }

  onDestroy(async () => {
    window.removeEventListener("keydown", keypressInput);
    window.removeEventListener("mousedown", mouseClick);
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
      <div class="labmenu-container">
        <ul
          class="labmenu">
          {@html lab.navbarHtml}
        </ul>
      </div>
      <div id="lab-panel"
           class="labpanel">
        <header class="labmenu-mobile">
          <nav class="flex flex-wrap justify-between">
            {@html lab.horizontalNavbarHtml}
          </nav>
        </header>
        <article class="labcontent" in:fly="{{ x: direction, duration: 200 }}" >
          {@html lab.content}
        </article>
      </div>
    </div>
  {/if}
{/await}

<style>
:global(.labcontent pre) {
  color : white;
}
</style>
