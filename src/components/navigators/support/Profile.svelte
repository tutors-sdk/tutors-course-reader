<script lang="ts">
  import { currentCourse } from "../../../services/course/stores";
  import IconBar from "../../iconography/IconBar.svelte";
</script>

{#if ($currentCourse.authLevel > 0) }
<div class="shadow-lg bg-neutral text-neutral-content rounded-box horizontal flex-none ml-2">
  <IconBar nav={$currentCourse.profileBar} />
  </div>
{/if}
