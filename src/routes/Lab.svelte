<script lang="ts">
  import { location } from "svelte-spa-router";
  import { createEventDispatcher, getContext } from "svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import type { Cache } from "../services/cache";
  import { getCouseTitleProps } from "../elements/navigators/navigator-properties";
  export let params: any = {};
  import type { Course } from "../services/course";
  import type { Lo } from "../services/lo";
  import type { Lab } from "../services/lab";
  import { fade } from "svelte/transition";
  import { getIconFromType } from "../elements/iconography/icons";

  const cache: Cache = getContext("cache");

  let lab: Lab = null;
  let refreshStep = false;
  onMount(async () => {
    lab = await cache.fetchLab(params.wild);
    dispatchLabNavProps(dispatch, cache.course, lab.lo);
  });

  location.subscribe((value) => {
    const step = value.substr(value.lastIndexOf("/") + 1);
    refreshStep = !refreshStep;
    if (lab) {
      lab.setActivePage(step);
    }
  });

  export function dispatchLabNavProps(dispatcher, course: Course, lo: Lo) {
    let titleProps = getCouseTitleProps(course);
    titleProps.title = lo.title;
    titleProps.subtitle = course.lo.title;
    titleProps.img = lo.img;
    titleProps.parentIcon = getIconFromType("topic");
    titleProps.parentTip = "To parent topic...";
    titleProps.parentLink = lo.parent.lo.route;
    titleProps.tocVisible = false;
    dispatcher("routeEvent", titleProps);
  }
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
  .bar-wrap {
    padding: 2rem;
  }
  #right-col {
    margin-left: 210px;
  }
</style>

{#if lab}
  <aside id="left-col" class="uk-light uk-animation-slide-left">
    <div class="bar-wrap">
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
{/if}
