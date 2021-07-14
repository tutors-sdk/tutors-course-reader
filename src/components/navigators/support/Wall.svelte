<script lang="ts">
  import { currentCourse } from "../../../services/course/stores";
  import IconBar from "../../iconography/IconBar.svelte";
</script>

<span class="hidden lg:block">
  <IconBar nav={$currentCourse.wallBar} />
</span>
