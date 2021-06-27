<script lang="ts">
  import { getIcon } from "./icon-lib";
  import Icon from "svelte-hero-icons";

  export let type;
  export let toolTip = "";
  export let link = "";
  export let target = "";
</script>

<div data-tip="{toolTip}" class="tooltip tooltip-bottom">
  {#if getIcon(type)}
    {#if link}
      <a target="{target}" href="{link}">
        <Icon src={getIcon(type).icon} class="w-5 h-5 text-{getIcon(type).colour}" />
      </a>
    {:else}
      <Icon src={getIcon(type).icon} class="w-5 h-5 text-{getIcon(type).colour}" />
    {/if}
  {:else}
    <h1> {type} </h1>
  {/if}
</div>

