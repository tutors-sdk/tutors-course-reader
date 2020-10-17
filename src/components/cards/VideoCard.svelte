<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import type { Lo } from "../../services/course/lo";

  export let lo: Lo;
  let heanet = false;
  let heanetId = "";

  if (lo.videoids) {
    if (lo.videoids.videoIds.length > 0) {
      if (lo.videoids.videoIds[lo.videoids.videoIds.length - 1].service === "heanet") {
        heanet = true;
        heanetId = lo.videoids.videoIds[lo.videoids.videoIds.length - 1].id;
      }
    }
  }

  function extractVideoId(lo: Lo) {
    const parts = lo.video.split("/");
    return parts.pop() || parts.pop();
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="uk-card uk-card-default uk-box-shadow-xlarge uk-animation-fade">
  <div class="uk-card-header">
    <div uk-grid>
      <div class="uk-width-expand@m">
        <div class="card-title">{lo.title}</div>
      </div>
      <div>
        <Icon data={getIconFromType(lo.type)} scale="2" />
      </div>
    </div>
  </div>
  <div class="uk-card-media-top">
    <vime-player controls>
      {#if heanet } 
      <vime-hls version="latest" poster={lo.parent.lo.img}>
        <source data-src="https://media.heanet.ie/m3u8/{heanetId}" type="application/x-mpegURL" />
      </vime-hls>
      {:else}
      <vime-youtube video-id="{extractVideoId(lo)}"></vime-youtube>
      {/if}
    </vime-player>
  </div>
</div>
