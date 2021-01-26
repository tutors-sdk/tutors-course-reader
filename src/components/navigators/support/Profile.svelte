<script lang="ts">
  import { currentCourse } from "../../../services/course/stores";
  import IconBar from "../../iconography/IconBar.svelte";
  import {isAuthenticated} from "../../../services/analytics/auth-service";

  console.log($currentCourse);
</script>

{#if ($currentCourse.authLevel > 0) }
  <IconBar nav={$currentCourse.profileBar} />
{/if}
