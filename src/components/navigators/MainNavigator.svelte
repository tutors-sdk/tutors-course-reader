<script lang="ts">
  import TitleCard from "../cards/TitleCard.svelte";
  import TocBtn from "./TocBtn.svelte";
  import Icon from "svelte-awesome";
  import IconBar from "../iconography/IconBar.svelte";
  import { onMount } from "svelte";
  import { tocVisible, companions, walls, profile, parent } from "../../services/course/stores";
  import { getIconFromType } from "../iconography/icons";
  export let revealSidebar = true;

  onMount(async () => {});
</script>

<style>
  button {
    border: none;
  }
</style>

<div
  class="uk-flex uk-flex-center uk-flex-middle uk-text-center uk-grid-small"
  uk-scrollspy="cls: uk-animation-slide-top; repeat: true"
  uk-grid>
  {#if $tocVisible}
    <button class="uk-button uk-button-default" on:click={() => (revealSidebar = !revealSidebar)}>
      <TocBtn />
    </button>
  {/if}
  <TitleCard />
  {#if $parent.visible}
    <a id="parent" href={$parent.link} title={$parent.tip} pos="bottom" uk-tooltip>
      <Icon data={getIconFromType($parent.icon)} scale="4" />
    </a>
  {/if}
  {#if $companions.show}
    <div>
      <IconBar nav={$companions} />
    </div>
  {/if}
  {#if $walls.show}
    <div>
      <IconBar nav={$walls} />
    </div>
  {/if}
  {#if $profile.show}
    <div>
      <IconBar nav={$profile} />
    </div>
  {/if}
</div>
