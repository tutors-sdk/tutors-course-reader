<script lang="ts">
  import { currentCourse, revealInfoBar } from "../../../stores";
  import Icon from "../../iconography/Icon.svelte";
</script>

{#if $currentCourse?.lo.contentMd}
  <button on:click={() => revealInfoBar.set(true)}>
    <Icon type="toc" toolTip="Course Information" button="true" tipPos="tooltip-right" />
  </button>
{/if}
