<script lang="ts">
  import TitleCard from "../cards/TitleCard.svelte";
  import TocBtn from "./TocBtn.svelte";
  import Icon from "svelte-awesome";
  import IconBar from "../iconography/IconBar.svelte";
  import { navigatorProps, profile } from "../../services/course/stores";
  import { getIconFromType } from "../iconography/icons";
  import { revealSidebar, courseUrl } from "../../services/course/stores";
</script>

<style>
  button {
    border: none;
  }
</style>

<!--<div class="h-24 flex justify-center items-center flex-wrap">-->
<div class="flex items-center justify-center">
  {#if $navigatorProps.tocShow}
    <button class="invisible md:visible" on:click={() => revealSidebar.set(true)}>
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
    <div class="m:m-4 invisible md:visible">
      <IconBar nav={$navigatorProps.companions} />
    </div>
  {/if}
  {#if $navigatorProps.walls.show}
    <div class="m-4 invisible md:visible">
      <IconBar nav={$navigatorProps.walls} />
    </div>
  {/if}
  <a href="/#/search/{$courseUrl}"><Icon class="icon-moduleHome" data={getIconFromType('search')} scale="2" /></a>
  {#if $profile.show}
    <div class="m-4">
      <IconBar nav={$profile} />
    </div>
  {/if}
</div>
