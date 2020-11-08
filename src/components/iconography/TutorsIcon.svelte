<script lang="ts">
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  export let version = "2.1.1";
</script>

<div class="uk-card uk-card-small uk-card-hover uk-text-center uk-padding-remove">
  <a target="”_blank”" href="https://github.com/tutors-sdk/tutors-svelte">
    <div>
      <Icon class="icon-moduleHome" data={getIconFromType('tutors')} scale="2" />
    </div>
    <div class="uk-width-expand@m uk-text-left">
      <div class="uk-text-muted uk-text-center" style="font-size:xx-small">Tutors {version}</div>
    </div>
  </a>
</div>
