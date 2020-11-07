<script lang="ts">
  import TitleCard from "../cards/TitleCard.svelte";
  import TocBtn from "./TocBtn.svelte";
  import Icon from "svelte-awesome";
  import IconBar from "../iconography/IconBar.svelte";
  import { navigatorProps, profile } from "../../services/course/stores";
  import { getIconFromType } from "../iconography/icons";
  import { revealSidebar } from "../../services/course/stores";
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
  {#if $navigatorProps.tocShow}
    <button class="uk-button uk-button-default" on:click={() => revealSidebar.set(true)}>
      <TocBtn />
    </button>
  {/if}
  <TitleCard />
  {#if $navigatorProps.parent.show == true}
    <a id="parent" href="{$navigatorProps.parent.link}" uk-tooltip="title: {$navigatorProps.parent.tip}; pos: bottom">
      <Icon data={getIconFromType($navigatorProps.parent.icon)} scale="4" />
    </a>
  {/if}
  {#if $navigatorProps.companions.show}
    <div>
      <IconBar nav={$navigatorProps.companions} />
    </div>
  {/if}
  {#if $navigatorProps.walls.show}
    <div>
      <IconBar nav={$navigatorProps.walls} />
    </div>
  {/if}
  {#if $profile.show}
    <div>
      <IconBar nav={$profile} />
    </div>
  {/if}
</div>
