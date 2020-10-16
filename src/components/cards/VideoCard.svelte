<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import type { Lo } from "../../services/course/lo";

  export let lo: Lo = null;

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
    <iframe
      width="1920"
      height="1080"
      src="https://www.youtube.com/embed/{extractVideoId(lo)}"
      allow="autoplay; encrypted-media"
      allowfullscreen
      uk-responsive />
  </div>
</div>
