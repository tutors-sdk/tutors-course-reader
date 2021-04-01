<script lang="ts">
  import type { Lo } from "../../services/course/lo";
  import { currentCourse } from "../../services/course/stores";

  export let lo: Lo;
  let heanet = false;
  let heanetId = "";
  let heanetPoster = "";
  const parts = lo.video.split("/");
  let defaultId = parts.pop() || parts.pop();

  if (lo.videoids) {
    if (lo.videoids.videoIds.length > 0) {
      if (lo.videoids.videoIds[lo.videoids.videoIds.length - 1].service === "heanet") {
        heanet = true;
        heanetId = lo.videoids.videoIds[lo.videoids.videoIds.length - 1].id;
        if (lo.type === "panelvideo") {
          heanetPoster = lo.parent.lo.img;
        } else {
          heanetPoster = lo.img
        }
      }
    }
  }
</script>

{#if $currentCourse && !$currentCourse.areVideosHidden()}
  <div class="shadow-md border rounded-lg overflow-hidden w-full">
    {#if heanet}
      <vime-player controls>
        <vime-hls version="latest" poster={heanetPoster}>
          <source data-src="https://media.heanet.ie/m3u8/{heanetId}" type="application/x-mpegURL" />
        </vime-hls>
      </vime-player>
    {:else}
      <div class="relative" style="padding-top: 56.25%">
        <iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/{defaultId}"
                allow="autoplay; encrypted-media" allowfullscreen uk-responsive></iframe>
      </div>
    {/if}
  </div>
{/if}
