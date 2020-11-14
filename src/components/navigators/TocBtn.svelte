<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
</script>

<div  uk-tooltip="title: Course Contents; pos: bottom">
  <Icon class="icon-moduleHome" data={getIconFromType('toc')} scale="2" />
</div>
