<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import type { Lo } from "../../services/course/lo";

  export let lo: Lo;
  let heanet = false;
  let heanetId = "";
  const parts = lo.video.split("/");
  let defaultId = parts.pop() || parts.pop();

  if (lo.videoids) {
    if (lo.videoids.videoIds.length > 0) {
      if (lo.videoids.videoIds[lo.videoids.videoIds.length - 1].service === "heanet") {
        heanet = true;
        heanetId = lo.videoids.videoIds[lo.videoids.videoIds.length - 1].id;
      }
    }
  }

  export let showTopicNav = true;
  let close = function () {
    showTopicNav = !showTopicNav;
  };
</script>

<style>
  button {
    border: none;
  }
</style>

<div class="uk-card uk-card-default uk-box-shadow-xlarge uk-animation-fade uk-border-rounded uk-margin-top">
  <div class="uk-card-header">
    <div uk-grid>
      <div class="uk-width-expand@m">
        <div class="card-title">{lo.title}</div>
      </div>
      <button class="uk-button uk-button-default uk-position-top-right uk-padding-small"  uk-tooltip="title: toggle panel width; pos: bottom"  on:click={close}>
        <Icon data={getIconFromType("expand")} scale="2" />
      </button>
    </div>
  </div>
  <div class="uk-card-media-top">
    <vime-player controls>
      {#if heanet}
        <vime-hls version="latest" poster={lo.parent.lo.img}>
          <source data-src="https://media.heanet.ie/m3u8/{heanetId}" type="application/x-mpegURL" />
        </vime-hls>
      {:else}
        <vime-youtube video-id={defaultId} />
      {/if}
    </vime-player>
  </div>
</div>
