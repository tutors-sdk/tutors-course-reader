<script lang="ts">
  import {getIcon} from "./icon-lib"
  import Icon from "svelte-awesome";

  export let type;
  export let toolTip;
  export let link;
  export let target;
  export let scale;

</script>
{#if getIcon(type)}
  <a class="tooltip hover:border-gray-900" target="{target}" href="{link}" >
    {#if toolTip}
      <span class="tooltip-text">{toolTip}</span>
    {/if}
    <Icon data={getIcon(type).icon} scale="{scale}" style="color:{getIcon(type).colour};" />
  </a>
  {:else}
  <h1> {type} </h1>
{/if}
