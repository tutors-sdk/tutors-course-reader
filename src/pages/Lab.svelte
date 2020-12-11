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

  let changeLabOrientation = function () {
    vertical = !vertical;
    verticalIcon = vertical ? "switchOn" : "switchOff";
    localStorage.labVertical = vertical;
    lab.vertical = vertical;
    lab.refreshNav();
  };

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

<style>
  #left-col {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    /*background-color: #222;*/
    width: 190px;
    z-index: 1;
  }
  button {
    border: none;
  }
  .bar-wrap {
    padding: 2rem;
  }
  #right-col {
    margin-left: 210px;
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#if lab}
  {#if vertical}
    <aside id="left-col" class="p-2">
      <button title="Switch Menu Orientation" on:click={changeLabOrientation} uk-tooltip>
          <Icon data={getIconFromType(verticalIcon)} scale="2" />
      </button>
      <ul class="text-base bg-gray-800 text-white">
        {#key refreshStep}
          {@html lab.navbarHtml}
        {/key}
      </ul>
    </aside>
    <div id="right-col" class="px-16 py-8 text-base bg-white">
      {#key refreshStep}
        <div class="lab" in:fade>
          {@html lab.content}
        </div>
      {/key}
    </div>
  {:else}
    <div uk-sticky>
      <nav class="uk-navbar uk-animation-slide-top">
        <button
          class="uk-button uk-button-default"
          title="Switch to horizontal menu"
          on:click={changeLabOrientation}
          uk-tooltip>
          <Icon data={getIconFromType(verticalIcon)} scale="2" />
        </button>
        <div class="uk-navbar-right">
          <ul class="uk-subnav uk-background-secondary uk-subnav-pill">
            {#key refreshStep}
              {@html lab.navbarHtml}
            {/key}
          </ul>
        </div>
      </nav>
    </div>
    <div class="text-base bg-white">
      {#key refreshStep}
        <div class="lab" in:fade>
          {@html lab.content}
        </div>
      {/key}
    </div>
  {/if}
{/if}
