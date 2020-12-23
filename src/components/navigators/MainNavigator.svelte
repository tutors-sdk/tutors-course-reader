<script lang="ts">
  import TitleCard from "../cards/TitleCard.svelte";
  import Icon from "svelte-awesome";
  import IconBar from "../iconography/IconBar.svelte";
  import { navigatorProps, profile } from "../../services/course/stores";
  import { getIconFromType } from "../iconography/icons";
  import { revealSidebar, courseUrl } from "../../services/course/stores";
  import TocBtn from "./TocBtn.svelte";
</script>

<style>
  button {
    border: none;
  }
</style>

<div class="flex flex-col lg:flex-row justify-center items-center mx-auto text-center">
  {#if $navigatorProps.tocShow}
    <div class="w-1/12 hidden md:block">
      <button on:click={() => revealSidebar.set(true)}>
        <TocBtn />
      </button>
    </div>
  {/if}
  <TitleCard />
  <div class="flex items-center justify-center mx-4">
    {#if $navigatorProps.parent.show == true}
      <a class="ml-4" id="parent" href="{$navigatorProps.parent.link}" uk-tooltip="title: {$navigatorProps.parent.tip}; pos: bottom">
        <Icon class="icon-moduleHome" data={getIconFromType($navigatorProps.parent.icon)} scale="4" />
      </a>
    {/if}
    {#if $navigatorProps.companions.show}
      <div class="hidden md:block ml-4">
        <IconBar nav={$navigatorProps.companions} />
      </div>
    {/if}
    {#if $navigatorProps.walls.show}
      <div class="ml-4">
        <IconBar nav={$navigatorProps.walls} />
      </div>
    {/if}
    <a class="ml-4" href="/#/search/{$courseUrl}"><Icon class="icon-moduleHome" data={getIconFromType('search')} scale="2" /></a>
    {#if $profile.show}
      <div class="hidden md:block ml-4">
        <IconBar nav={$profile} />
      </div>
    {/if}
  </div>
</div>
