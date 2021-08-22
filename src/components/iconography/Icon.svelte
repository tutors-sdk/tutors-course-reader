<script lang="ts">
  // Jordan  - uncomment ether of the lines below to use either icon set.
  //import { getIcon } from "./icon-lib";
  import { getIcon } from "./icon-lib-la";
  import Icon from "@iconify/svelte";

  export let type = "default";
  export let toolTip = "";
  export let link = "";
  export let target = "";
  export let button = false;
  export let tipPos = "";
  export let width = 24;
  export let height = 24;

  let tip = "";
  let buttonAttr = "";
  if (toolTip) {
    tip = `tooltip ${tipPos} capitalize`;
  }
  if (button) {
    buttonAttr = "btn btn-square btn-ghost";
  }
</script>

<div data-tip="{toolTip}" class="{tip}">
  <div class="{buttonAttr}">
    {#if link}
      <a target="{target}" href="{link}">
        <Icon icon={getIcon(type).icon} class="text-{getIcon(type).icon}" width="{width}" height="{height}" />
      </a>
    {:else}
      <Icon icon={getIcon(type).icon} class="text-{getIcon(type).colour}" width="{width}" height="{height}" />
    {/if}
  </div>
</div>
