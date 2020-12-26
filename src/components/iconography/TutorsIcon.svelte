<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  export let version = "2.2.2";

</script>

<div class="tooltip">
  <span class='tooltip-text rounded'>Tutors Reader application source</span>
  <a target="”_blank”" href="https://github.com/tutors-sdk/tutors-svelte">
    <div>
      <Icon class="icon-moduleHome" data={getIconFromType('tutors')} scale="2" />
    </div>
    <div>
      <div class="text-xs font-thin text-gray-600" >Tutors {version}</div>
    </div>
  </a>
</div>
