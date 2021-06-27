<script lang="ts">
  import { currentCourse } from "../../../services/course/stores";
  import IconBar from "../../iconography/IconBar.svelte";
</script>

{#if !$currentCourse.isPortfolio() }
  <div class="shadow-lg bg-neutral text-neutral-content rounded-box horizontal flex-none ml-2">
    <IconBar nav={$currentCourse.companions} />
  </div>
{/if}
