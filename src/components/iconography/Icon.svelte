<script lang="ts">

  import { getIcon } from "./icon-lib";
  import { HeroIconLib } from "./hero-icons";
  import { LineAwesomeIconLib} from "./lineaesome-icons";
  import Icon from "@iconify/svelte";

  export let type = "default";
  export let toolTip = "";
  export let link = "";
  export let target = "";
  export let button = false;
  export let tipPos = "";
  export let width = 20;
  export let height = 20;

  let tip = "";
  let buttonAttr = "";
  if (toolTip) {
    tip = `tooltip ${tipPos} capitalize`;
  }
  if (button) {
    buttonAttr = "btn btn-square btn-ghost";
  }
  let iconLib = HeroIconLib;
  //let iconLib = LineAwesomeIconLib;
</script>

<div data-tip="{toolTip}" class="{tip}">
  <div class="{buttonAttr}">
    {#if link}
      <a target="{target}" href="{link}">
        <Icon icon={getIcon(iconLib, type).icon} class="text-{getIcon(iconLib, type).colour}" width="{width}" height="{height}" />
      </a>
    {:else}
      <Icon icon={getIcon(iconLib, type).icon} class="text-{getIcon(iconLib, type).colour}" width="{width}" height="{height}" />
    {/if}
  </div>
</div>
