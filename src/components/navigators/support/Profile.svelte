<script lang="ts">
  import { currentCourse } from "../../../services/course/stores";
  import IconBar from "../../iconography/IconBar.svelte";
</script>

{#if ($currentCourse.authLevel > 0) }
  <IconBar nav={$currentCourse.profileBar} />
{/if}
