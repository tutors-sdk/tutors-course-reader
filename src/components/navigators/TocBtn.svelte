<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
</script>

<div class="uk-padding-small">
  <div  uk-tooltip="title: Course Contents; pos: bottom">
    <Icon class="icon-moduleHome" data={getIconFromType('toc')} scale="3" />
  </div>
</div>
