<script lang="ts">
  import { courseUrl, currentCourse } from "../../../services/course/stores";
  import Icon from "../../iconography/Icon.svelte";
</script>

<Icon type="search" link="/#/search/{$courseUrl}" toolTip="Search all Labs" scale="1.5" />
