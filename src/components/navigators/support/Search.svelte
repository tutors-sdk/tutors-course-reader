<script lang="ts">
  import { courseUrl, currentCourse } from "../../../services/course/stores";
  import Icon from "../../iconography/Icon.svelte";
</script>

{#if !$currentCourse.isPortfolio() }
  <Icon type="search" link="/#/search/{$courseUrl}" toolTip="Search all Labs" scale="1.5" />
{/if}
