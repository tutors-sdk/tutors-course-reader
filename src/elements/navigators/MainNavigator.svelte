<script lang="ts">
  import TitleCard from "../cards/TitleCard.svelte";
  import TocBtn from "./TocBtn.svelte";
  import Icon from "svelte-awesome";
  import { getDefaultTitleProps } from "./navigator-properties";

  export let titleProps = getDefaultTitleProps();
</script>

<div
  class="uk-flex uk-flex-center uk-flex-middle uk-text-center uk-grid-small"
  uk-scrollspy="cls: uk-animation-slide-top; repeat: true"
  uk-grid>
  {#if titleProps.tocVisible}
    <TocBtn />
  {/if}
  <div class="uk-width-1-2@m  uk-card uk-card-default uk-padding-small uk-visible@m">
    <TitleCard {titleProps} />
  </div>
  {#if titleProps.parentVisible}
    <a id="parent" href={titleProps.parentLink} title={titleProps.parentTip} pos="bottom" uk-tooltip>
      <Icon data={titleProps.parentIcon} scale="4" />
    </a>
  {/if}
</div>
