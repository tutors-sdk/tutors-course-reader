<script lang="ts">
  import { HeroIconLib } from "./icon-lib";
  import { LaIconLib } from "./icon-lib-la";
  //import Icon from "svelte-hero-icons";
  import Icon from '@iconify/svelte';

  //let IconLib = HeroIconLib;
  let IconLib = LaIconLib;
  export let type;
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
  let iconRef = IconLib[`${type}`].icon;
  let iconColour = IconLib[`${type}`].colour;
  if (IconLib[`${type}`]) {
    iconRef = IconLib[`${type}`].icon;
    iconColour = IconLib[`${type}`].colour;
  }
</script>

<div data-tip="{toolTip}" class="{tip}">
  <div class="{buttonAttr}">
    {#if link}
      <a target="{target}" href="{link}">
<!--        <Icon src={iconRef} class="w-5 h-5 text-{iconColour}" width="{width}" height="{height}"/>-->
        <Icon icon={iconRef} class="w-5 h-5 text-{iconColour}" width="{width}" height="{height}"/>
      </a>
    {:else}
<!--      <Icon src={iconRef} class="w-5 h-5 text-{iconColour}" width="{width}" height="{height}"/>-->
      <Icon icon={iconRef} class="w-5 h-5 text-{iconColour}" width="{width}" height="{height}"/>
    {/if}
  </div>
</div>
