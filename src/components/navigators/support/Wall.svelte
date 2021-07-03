<script lang="ts">
  import { currentCourse } from "../../../services/course/stores";
  import IconBar from "../../iconography/IconBar.svelte";
</script>

{#if !$currentCourse.isPortfolio() }
<IconBar nav={$currentCourse.wallBar} />
{/if}