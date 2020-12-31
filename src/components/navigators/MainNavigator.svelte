<script lang="ts">
  import TitleCard from "../cards/TitleCard.svelte";
  import Icon from "svelte-awesome";
  import IconBar from "../iconography/IconBar.svelte";
  import { navigatorProps, profile } from "../../services/course/stores";
  import { getIconFromType } from "../iconography/icons";
  import { revealSidebar, courseUrl } from "../../services/course/stores";
  import TocBtn from "./TocBtn.svelte";
  import DarkMode from "./DarkMode.svelte"
</script>

<style>
  button {
    border: none;
  }
</style>

<div class="flex flex-row flex-nowrap justify-center items-center text-center dark:bg-black dark:text-gray-100">
  {#if $navigatorProps.companions.show}
    <div class="mx-4 hidden lg:block">
      <IconBar nav={$navigatorProps.companions} />
    </div>
  {/if}

  {#if $navigatorProps.parent.show == true}
    <a class="mx-4 tooltip" id="parent" href="{$navigatorProps.parent.link}">
      <Icon class="icon-moduleHome" data={getIconFromType($navigatorProps.parent.icon)} scale="4" />
      <span class='tooltip-text'>{$navigatorProps.parent.tip}</span>
    </a>
  {/if}
  <TitleCard class="mx-4"/>
  <div class="hidden md:block">
    <div class="flex flex-row items-center justify-center">
      {#if $navigatorProps.walls.show}
        <div class="mx-4">
          <IconBar nav={$navigatorProps.walls} />
        </div>
      {/if}
      <DarkMode />
      {#if $profile.show}
        <div class="mx-4">
          <IconBar nav={$profile} />
        </div>
      {/if}
      <div class="tooltip">
        <a href="/#/search/{$courseUrl}"><Icon class="icon-moduleHome" data={getIconFromType('search')} scale="1.5" /></a>
        <span class='tooltip-text'> Search all Labs </span>
      </div>
    </div>

  </div>
  {#if $navigatorProps.tocShow}
    <div class="mx-4 hidden md:block">
      <button on:click={() => revealSidebar.set(true)}>
        <TocBtn />
      </button>
    </div>
  {/if}

</div>
