<script lang="ts">
  import { getDefaultTitleProps } from "../../services/page-support/pageload";
  import TutorsIcon from "../iconography/TutorsIcon.svelte";
  export let titleProps = getDefaultTitleProps();
</script>

<div class="uk-width-1-2@m  uk-card uk-card-default uk-padding-small uk-visible@m">
  <div class="uk-grid">
    <div class="uk-width-1-6@m"><img src={titleProps.img} width="60" alt="img" /></div>
    <div class="uk-width-expand@m uk-text-left">
      <div class="course-title">{titleProps.title}</div>
      <div class="uk-text-muted uk-text-small">{titleProps.subtitle}</div>
    </div>
    <div class="uk-width-1-6@m">
      <TutorsIcon version={titleProps.version} />
    </div>
  </div>
</div>
