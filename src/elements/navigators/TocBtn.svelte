<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  let icon = getIconFromType("toc");
</script>

<div class="uk-padding-small">
  <a id="toc" href="#course-navigator" uk-toggle title="Course Contents" pos="bottom" uk-tooltip>
    <Icon data={icon} scale="2" />
  </a>
</div>
