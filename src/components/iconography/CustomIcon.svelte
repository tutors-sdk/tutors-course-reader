<script lang="ts">
  import { getIcon } from "./icon-lib";
  import SvgIcon from "SvgIcon.svelte";

  export let type;
  export let toolTip = "";
  export let link = "";
  export let target = "";
  export let scale;

  const iconProps = {
    color : getIcon(type).colour ,
    fill : "none",
    size: scale + "em",
    d : getIcon(type).customIcon
  }
</script>

{#if getIcon(type)}
  {#if link}
    <a class="tooltip hover:border-gray-900" target="{target}" href="{link}">
      {#if toolTip}
        <span class="tooltip-text">{toolTip}</span>
      {/if}
      <SvgIcon {...iconProps} />
    </a>
  {:else}
    <span class="tooltip">
      {#if toolTip}
        <span class="tooltip-text">{toolTip}</span>
      {/if}
      <SvgIcon {...iconProps} />
    </span>
  {/if}
{:else}
  <h1> {type} </h1>
{/if}
