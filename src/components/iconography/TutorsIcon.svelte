<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  export let version = "2.2.2";
</script>

<a class="tooltip" target="”_blank”" href="https://github.com/tutors-sdk/tutors-svelte">
  <span class='tooltip-text'>Tutors Reader application source {version}</span>
  <Icon class="icon-moduleHome" data={getIconFromType('tutors')} scale="2" />
</a>

