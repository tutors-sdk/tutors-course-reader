<script lang="ts">
  import { currentCourse } from "../../../services/course/stores";
  import IconBar from "../../iconography/IconBar.svelte";
</script>

{#if !$currentCourse.isPortfolio() }
  <span class="hidden md:block">
    <IconBar nav={$currentCourse.companions} />
  </span>
{/if}
