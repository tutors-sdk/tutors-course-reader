<script lang="ts">
  import { location } from "svelte-spa-router";
  import { createEventDispatcher, getContext } from "svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import type { CourseRepo } from "../services/course-repo";
  import { dispatchLabNavProps } from "../elements/navigators/navigator-properties";
  export let params: any = {};
  import { Lab } from "../services/lab";
  import { fade } from "svelte/transition";

  const courseRepo: CourseRepo = getContext("courseRepo");

  let lab = new Lab();
  let refreshLab = false;
  let refreshStep = false;
  onMount(async () => {
    await lab.fetchPage(courseRepo, params.wild);
    refreshLab = !refreshLab;
    dispatchLabNavProps(dispatch, courseRepo.course, lab.lo);
  });

  location.subscribe((value) => {
    if (courseRepo.course) {
      lab.fetchPage(courseRepo, value.substring(5));
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
