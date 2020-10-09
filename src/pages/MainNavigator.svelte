<script lang="ts">
  import TitleCard from "../components/cards/TitleCard.svelte";
  import TocBtn from "../components/navigators/TocBtn.svelte";
  import Icon from "svelte-awesome";
  import { getDefaultTitleProps } from "../components/navigators/title-props";
  import IconBar from "../components/iconography/IconBar.svelte";
  import { onMount } from "svelte";

  export let titleProps = getDefaultTitleProps();
  export let revealSidebar = true;

  onMount(async () => {});
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
    {#if titleProps.profile.show}
      <div>
        <IconBar nav={titleProps.profile} />
      </div>
    {/if}
  </div>
{/if}
