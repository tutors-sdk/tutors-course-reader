<script lang="ts">
  import { location } from "svelte-spa-router";
  import { createEventDispatcher, getContext } from "svelte";
  const dispatch = createEventDispatcher();
  import Icon from "svelte-awesome";
  import { onMount, onDestroy } from "svelte";
  import type { Cache } from "../services/cache";
  export let params: any = {};
  import type { Lab } from "../services/lab";
  import { fade } from "svelte/transition";
  import { getIconFromType } from "../components/iconography/icons";
  import type { AnalyticsService } from "../services/analytics-service";
  import { pageLoad } from "../services/page-support/pageload";

  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
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

  onMount(async () => {
    lab = await cache.fetchLab(params.wild);
    pageLoad(params.wild, cache.course, lab.lo, analytics);
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
      console.log(value);
      pageLoad(params.wild, cache.course, lab.lo, analytics);
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
    background-color: #222;
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

{#if lab}
  {#if vertical}
    <aside id="left-col" class="uk-light uk-animation-slide-left">
      <div class="bar-wrap">
        <button
          class="uk-button uk-button-default uk-position-top-right"
          title="Switch Menu Orientation"
          on:click={changeLabOrientation}
          uk-tooltip>
          <Icon data={getIconFromType(verticalIcon)} scale="2" />
        </button>
        <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
          {#key refreshStep}
            {@html lab.navbarHtml}
          {/key}
        </ul>
      </div>
    </aside>
    <div id="right-col">
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
    <div class="uk-container uk-container-expand uk-padding-small">
      {#key refreshStep}
        <div class="lab" in:fade>
          {@html lab.content}
        </div>
      {/key}
    </div>
  {/if}
{/if}
