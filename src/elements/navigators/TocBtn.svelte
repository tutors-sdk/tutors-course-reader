<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
</script>

<div class="uk-padding-small">
  <a id="toc" href="#course-navigator" uk-toggle title="Course Contents" pos="bottom" uk-tooltip>
    <Icon data={getIconFromType('toc')} scale="2" />
  </a>
</div>
