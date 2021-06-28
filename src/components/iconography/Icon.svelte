<script lang="ts">
  import { getIcon } from "./icon-lib";
  import Icon from "svelte-hero-icons";

  export let type;
  export let toolTip = "";
  export let link = "";
  export let target = "";
  export let button = "";
</script>

<div data-tip="{toolTip}" class="tooltip capitalize">
  {#if getIcon(type)}
    {#if link}
      {#if button}
      <button tabindex="0" class="btn btn-square btn-ghost">
        <a target="{target}" href="{link}">
          <Icon src={getIcon(type).icon} class="w-5 h-5 text-{getIcon(type).colour}" />
        </a>
      </button>
      {:else}
      <a target="{target}" href="{link}">
        <Icon src={getIcon(type).icon} class="w-5 h-5 text-{getIcon(type).colour}" />
      </a>
      {/if}
    {:else}
      {#if button}
      <button tabindex="0" class="btn btn-square btn-ghost">
        <Icon src={getIcon(type).icon} class="w-5 h-5 text-{getIcon(type).colour}" />
      </button>
      {:else}
      <Icon src={getIcon(type).icon} class="w-5 h-5 text-{getIcon(type).colour}" />
      {/if}
    {/if}
  {:else}
    <h1> {type} </h1>
  {/if}
</div>

