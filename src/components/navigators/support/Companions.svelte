<script lang="ts">
  import { currentCourse } from "../../../services/course/stores";
  import IconBar from "../../iconography/IconBar.svelte";
</script>

<span class="hidden xl:block">
  <IconBar nav={$currentCourse.companions} />
</span>
