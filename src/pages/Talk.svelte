<script lang="ts">
  import { location } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher, getContext } from "svelte";
  import TalkCard from "../components/cards/TalkCard.svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import type { Course } from "../services/course";
  import type { Lo } from "../services/lo";
  import type { Cache } from "../services/cache";
  import TopicNavigatorCard from "../components/cards/TopicNavigatorCard.svelte";
  import { getCouseTitleProps } from "../components/navigators/title-props";
  import { getIconFromType } from "../components/iconography/icons";
  export let params: any = {};

  const cache: Cache = getContext("cache");
  let lo: Lo = null;

  let refreshPdf = true;

  location.subscribe((value) => {
    if (cache.course) {
      const ref = `/#${value}`;
      lo = cache.course.talks.get(ref);
      if (lo) {
        refreshPdf = !refreshPdf;
        dispatchTitleProps(dispatch, cache.course, lo);
      }
    }
  });

  onMount(async () => {
    await cache.fetchCourseFromTalk(params.wild);
    const ref = `/#/talk/${params.wild}`;
    lo = cache.course.talks.get(ref);
    dispatchTitleProps(dispatch, cache.course, lo);
  });
  export function dispatchTitleProps(dispatcher, course: Course, lo: Lo) {
    let titleProps = getCouseTitleProps(course);
    titleProps.title = lo.title;
    titleProps.subtitle = course.lo.title;
    titleProps.img = lo.img;
    titleProps.parentIcon = getIconFromType("topic");
    titleProps.parentTip = "To parent topic...";
    titleProps.parentLink = lo.parent.lo.route;
    titleProps.parentTarget = "";
    dispatcher("routeEvent", titleProps);
  }
</script>

{#if lo}
  <div
    class="uk-container-expand uk-margin-medium-top uk-margin-medium-left uk-margin-medium-right"
    in:fade={{ duration: 500 }}>
    <div uk-grid uk-flex uk-flex-center>
      <div class="uk-width-expand@m">
        {#key refreshPdf}
          <TalkCard {lo} />
        {/key}
      </div>
      <div class="uk-width-1-5@m uk-flex uk-grid">
        <TopicNavigatorCard topic={lo.parent} />
      </div>
    </div>
  </div>
{/if}
