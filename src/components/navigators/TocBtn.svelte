<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
</script>

<div class="tooltip">
  <Icon class="icon-moduleHome" data={getIconFromType('toc')} scale="2" />
  <span class="tooltip-text"> Course Contente </span>
</div>
