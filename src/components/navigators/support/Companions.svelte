<script lang="ts">
  import { currentCourse } from "../../../services/course/stores";
  import IconBar from "../../iconography/IconBar.svelte";
</script>

{#if !$currentCourse.isPortfolio() }
  <div class="hidden lg:block">
    <IconBar nav={$currentCourse.companions} />
  </div>
{/if}
