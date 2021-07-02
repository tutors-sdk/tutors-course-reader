<script lang="ts">
  import Icon from "../../iconography/Icon.svelte";
  import type { Lo } from "../../../services/course/lo";

  export let lo: Lo;
</script>

<li>
  {#if lo.type === "unit"}
    <a class="btn btn-sm capitalize" href="{lo.route}{lo.id}">
      <Icon type="{lo.type}"/>
      <span class="hidden md:block md:pl-2">{lo.title}</span></a>
  {:else}
    <a class="btn btn-sm capitalize" href="{lo.route}">
      <Icon type="{lo.type}" />
      <span class="hidden md:block md:pl-2">{lo.title}</span></a>
  {/if}
</li>
