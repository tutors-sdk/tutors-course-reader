<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  export let version = "2.2.2";
</script>

<div  uk-tooltip="title: Tutors Reader application source; pos: bottom">
  <a target="”_blank”" href="https://github.com/tutors-sdk/tutors-svelte">
    <div>
      <Icon class="icon-moduleHome" data={getIconFromType('tutors')} scale="2" />
    </div>
    <div>
      <div class="text-xs text-gray-600" >Tutors {version}</div>
    </div>
  </a>
</div>
