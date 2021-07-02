<script lang="ts">
  import Icon from "../../iconography/Icon.svelte";
  import type { Lo } from "../../../services/course/lo";

  export let lo: Lo;
</script>

<li>
  {#if lo.type === "unit"}
    <a href="{lo.route}{lo.id}">
      <Icon type="{lo.type}"/>
      &nbsp {lo.title}</a>
  {:else}
    <a href="{lo.route}">
      <Icon type="{lo.type}" />
      &nbsp {lo.title}</a>
  {/if}
</li>
