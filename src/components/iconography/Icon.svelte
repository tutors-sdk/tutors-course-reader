<script lang="ts">
  import { getIcon } from "./icon-lib";
  import Icon from "svelte-hero-icons";

  export let type;
  export let toolTip = "";
  export let link = "";
  export let target = "";

</script>
{#if getIcon(type)}
  {#if link}
    <a class="tooltip hover:border-gray-900 text-base-content" target="{target}" href="{link}">
      {#if toolTip}
        <span class="tooltip-text">{toolTip}</span>
      {/if}
      <Icon src={getIcon(type).icon} solid class="w-5 h-5 text-neutral-content" />
    </a>
  {:else}
    <span class="tooltip">
      {#if toolTip}
        <span class="tooltip-text">{toolTip}</span>
      {/if}
      <Icon src={getIcon(type).icon} solid class="w-5 h-5 text-{getIcon(type).colour}" />
    </span>
  {/if}
{:else}
  <h1> {type} </h1>
{/if}
