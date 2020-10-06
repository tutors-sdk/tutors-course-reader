<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import TitleCard from "../cards/TitleCard.svelte";
  import TocBtn from "./TocBtn.svelte";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import { getDefaultTitleProps } from "./navigator-properties";

  export let titleProps = getDefaultTitleProps();
  export let revealSidebar = true;
</script>

<style>
  button {
    /* background: none;
    color: inherit; */
    border: none;
    /* padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit; */
  }
</style>

<div
  class="uk-flex uk-flex-center uk-flex-middle uk-text-center uk-grid-small"
  uk-scrollspy="cls: uk-animation-slide-top; repeat: true"
  uk-grid>
  {#if titleProps.tocVisible}
    <button class="uk-button uk-button-default" on:click={() => (revealSidebar = !revealSidebar)}>
      <TocBtn />
    </button>
  {/if}
  <TitleCard {titleProps} />
  {#if titleProps.parentVisible}
    <a id="parent" href={titleProps.parentLink} title={titleProps.parentTip} pos="bottom" uk-tooltip>
      <Icon data={titleProps.parentIcon} scale="4" />
    </a>
  {/if}
  <!-- <button on:click={() => (revealSidebar = !revealSidebar)}>Toggle Sidebar</button> -->
</div>
