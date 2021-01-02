<script lang="ts">
  import TitleCard from "../cards/TitleCard.svelte";
  import Icon from "../iconography/Icon.svelte";
  import IconBar from "../iconography/IconBar.svelte";
  import { courseUrl, navigatorProps, profile, revealSidebar } from "../../services/course/stores";
  import DarkMode from "./DarkMode.svelte";
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
    <div class="mx-4">
      <Icon type="{$navigatorProps.parent.icon}" link="{$navigatorProps.parent.link}" toolTip="{$navigatorProps.parent.tip}" scale="4"></Icon>
    </div>
  {/if}
  <TitleCard class="mx-4" />
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
      <Icon type="search" link="/#/search/{$courseUrl}" toolTip="Search all Labs" scale="1.5" />
    </div>

  </div>
  {#if $navigatorProps.tocShow}
    <div class="mx-4 hidden md:block">
      <button on:click={() => revealSidebar.set(true)}>
        <Icon type="toc"  toolTip="course contents" scale="2" />
      </button>
    </div>
  {/if}

</div>
