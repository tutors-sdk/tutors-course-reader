<script lang="ts">
  import type { Lo } from "tutors-reader-lib/src/course/lo";
  import { currentCourse } from "../../stores";
  import { getIcon } from "../iconography/themes";

  export let lo: Lo;
  let heanet = false;
  let heanetId = "";
  let heanetPoster = "";
  const parts = lo.video.split("/");
  let defaultId = parts.pop() || parts.pop();

  if (lo && lo.type === "panelvideo") {
    lo.icon = { type: getIcon("video").icon, color: getIcon("video").colour };
  }

  if (lo.videoids) {
    if (lo.videoids.videoIds.length > 0) {
      if (lo.videoids.videoIds[lo.videoids.videoIds.length - 1].service === "heanet") {
        heanet = true;
        heanetId = lo.videoids.videoIds[lo.videoids.videoIds.length - 1].id;
        if (lo.type === "panelvideo") {
          heanetPoster = lo.parent.lo.img;
        } else {
          heanetPoster = lo.img;
        }
      }
    }
  }
</script>

{#if $currentCourse && !$currentCourse.areVideosHidden()}
  <div class="videocard-container">
    {#if heanet}
      <vime-player controls>
        <vime-hls version="latest" poster={heanetPoster}>
          <source data-src="https://media.heanet.ie/m3u8/{heanetId}" type="application/x-mpegURL" />
        </vime-hls>
      </vime-player>
    {:else}
      <div class="relative w-4/5" style="padding-top: 40%;">
        <iframe title="{lo.title}" class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/{defaultId}" allow="autoplay; encrypted-media" allowfullscreen
                uk-responsive></iframe>
      </div>
    {/if}
    <br>
    <p class="text-lg italic justify-center">{lo.title}</p>
  </div>
{/if}
