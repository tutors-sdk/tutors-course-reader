<script lang="ts">
  import { location } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher, getContext } from "svelte";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import type { Lo } from "../services/lo";
  import type { CourseRepo } from "../services/course-repo";
  import TopicNavigatorCard from "../elements/cards/TopicNavigatorCard.svelte";
  import VideoCard from "../elements/cards/VideoCard.svelte";
  import { dispatchTalkNavProps } from "../elements/navigators/navigator-properties";
  export let params: any = {};

  function extractVideoId(lo: Lo) {
    const parts = lo.video.split("/");
    return parts.pop() || parts.pop();
  }

  const courseRepo: CourseRepo = getContext("courseRepo");
  let lo: Lo = null;
  let refreshVideo = true;

  location.subscribe((value) => {
    if (courseRepo.course) {
      const ref = `/#${value}`;
      console.log(ref);
      lo = courseRepo.course.videos.get(ref);
      if (lo) {
        refreshVideo = !refreshVideo;
        dispatchTalkNavProps(dispatch, courseRepo.course, lo);
      }
    }
  });

  onMount(async () => {
    await courseRepo.fetchCourseFromTalk(params.wild);
    const ref = `/#/video/${params.wild}`;
    lo = courseRepo.course.videos.get(ref);
    dispatchTalkNavProps(dispatch, courseRepo.course, lo);
  });
</script>

{#if lo}
  <div
    class="uk-container-expand uk-margin-medium-top uk-margin-medium-left uk-margin-medium-right"
    in:fade={{ duration: 500 }}>
    <div uk-grid uk-flex uk-flex-center>
      <div class="uk-width-expand@m">
        {#key refreshVideo}
          <VideoCard {lo} videoid={extractVideoId(lo)} />
        {/key}
      </div>
      <div class="uk-width-1-5@m uk-flex uk-grid">
        <TopicNavigatorCard topic={lo.parent} />
      </div>
    </div>
  </div>
{/if}
