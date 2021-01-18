<script lang="ts">
  import { getIcon } from "./icon-lib";
  import SvgIcon from "./SvgIcon.svelte";

  export let type;
  export let toolTip = "";
  export let link = "";
  export let target = "";
  export let scale;

  $: icon = getIcon(type);

  $: iconProps = {
    color : icon.colour ,
    fill : "none",
    size: scale + "em",
    d : icon.customIcon
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


<!--<script lang="ts">-->
<!--  import { getIcon } from "./icon-lib";-->
<!--  import Icon from "svelte-awesome";-->

<!--  export let type;-->
<!--  export let toolTip = "";-->
<!--  export let link = "";-->
<!--  export let target = "";-->
<!--  export let scale;-->
<!--</script>-->

<!--{#if getIcon(type)}-->
<!--  {#if link}-->
<!--    <a class="tooltip hover:border-gray-900" target="{target}" href="{link}">-->
<!--      {#if toolTip}-->
<!--        <span class="tooltip-text">{toolTip}</span>-->
<!--      {/if}-->
<!--      <Icon data={getIcon(type).icon} scale="{scale}" style="color:{getIcon(type).colour};" />-->
<!--    </a>-->
<!--  {:else}-->
<!--    <span class="tooltip">-->
<!--      {#if toolTip}-->
<!--        <span class="tooltip-text">{toolTip}</span>-->
<!--      {/if}-->
<!--      <Icon data={getIcon(type).icon} scale="{scale}" style="color:{getIcon(type).colour};" />-->
<!--    </span>-->
<!--  {/if}-->
<!--{:else}-->
<!--  <h1> {type} </h1>-->
<!--{/if}-->
