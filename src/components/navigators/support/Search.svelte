<script lang="ts">
  import { courseUrl, currentCourse } from "../../../stores";
  import Icon from "../../iconography/Icon.svelte";
</script>

{#if !$currentCourse.isPortfolio() }
  <Icon type="search" toolTip="Search" link="/#/search/{$courseUrl}" button="true"/>
{/if}
