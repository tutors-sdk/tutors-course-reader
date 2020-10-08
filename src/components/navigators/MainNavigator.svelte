<script lang="ts">
  import TitleCard from "../cards/TitleCard.svelte";
  import TocBtn from "./TocBtn.svelte";
  import Icon from "svelte-awesome";
  import { getDefaultTitleProps } from "./title-props";
  import IconBar from "../iconography/IconBar.svelte";

  export let titleProps = getDefaultTitleProps();
  export let revealSidebar = true;
</script>

<style>
  button {
    border: none;
  }
</style>

{#if titleProps.title != ''}
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
      <a
        id="parent"
        href={titleProps.parentLink}
        target={titleProps.parentTarget}
        title={titleProps.parentTip}
        pos="bottom"
        uk-tooltip>
        <Icon data={titleProps.parentIcon} scale="4" />
      </a>
    {/if}
    {#if titleProps.companions.show}
      <div>
        <IconBar nav={titleProps.companions} />
      </div>
    {/if}
    {#if titleProps.walls.show}
      <div>
        <IconBar nav={titleProps.walls} />
      </div>
    {/if}
  </div>
{/if}
