<script lang="ts">
  import TutorsIcon from "../iconography/TutorsIcon.svelte";
  import { navigatorProps, version } from "../../services/course/stores";
</script>

<div class="uk-width-1-2@m  uk-card uk-card-default uk-padding-small uk-visible@m">
  <div class="uk-grid">
    <div class="uk-width-1-6@m"><img src={$navigatorProps.title.img} width="60" alt="img" /></div>
    <div class="uk-width-expand@m uk-text-left">
      <div class="course-title">{$navigatorProps.title.title}</div>
      <div class="uk-text-muted uk-text-small">{$navigatorProps.title.subTitle}</div>
    </div>
    <div class="uk-width-1-6@m">
      <TutorsIcon version={$version} />
    </div>
  </div>
</div>
