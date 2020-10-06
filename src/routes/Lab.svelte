<script lang="ts">
  import { location } from "svelte-spa-router";
  import { createEventDispatcher, getContext } from "svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import type { Cache } from "../services/cache";
  import { dispatchLabNavProps } from "../elements/navigators/navigator-properties";
  export let params: any = {};
  import { Lab } from "../services/lab";
  import { fade } from "svelte/transition";

  const cache: Cache = getContext("cache");

  let lab = new Lab();
  let refreshLab = false;
  let refreshStep = false;
  onMount(async () => {
    await lab.fetchPage(cache, params.wild);
    refreshLab = !refreshLab;
    dispatchLabNavProps(dispatch, cache.course, lab.lo);
  });

  location.subscribe((value) => {
    if (cache.course) {
      lab.fetchPage(cache, value.substring(5));
      refreshStep = !refreshStep;
    }
  });
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

{#key refreshLab}
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
{/key}
