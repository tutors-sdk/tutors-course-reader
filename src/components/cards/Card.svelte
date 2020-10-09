<script lang="ts">
  import ImageLoader from "../image/ImageLoader.svelte";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import type { Lo } from "../../services/lo";
  export let lo: Lo;
  let target = "";
  if (lo.type === "web") {
    target = "_blank";
    if (lo.route.startsWith("course")) {
      lo.route = `#/${lo.route}`;
    }
  }
</script>

<div
  class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">
  <a href={lo.route} {target}>
    <div uk-grid>
      <div class="uk-width-expand@m">
        <div class="card-title">{lo.title}</div>
      </div>
      <div class="uk-width-1-4@m">
        <Icon class="icon-{lo.type}" data={getIconFromType(lo.type)} scale="2" />
      </div>
    </div>
    <div class="uk-card-footer">
      <div class="uk-card-body">
        <!-- <img src={lo.img} alt="lo.title" /> -->
        <ImageLoader src="{lo.img}" alt="Our image"></ImageLoader>
      </div>
    </div>
    <div class="uk-card-footer">
      <div class="card-body ">
        {@html lo.summary}
      </div>
    </div>
  </a>
</div>
