<script lang="ts">
  import { getDefaultTitleProps } from "../navigators/navigator-properties";
  export let titleProps = getDefaultTitleProps();
</script>

<div class="uk-grid">
  <div class="uk-width-1-5@m"><img src={titleProps.img} width="60" /></div>
  <div class="uk-width-expand@m uk-text-left">
    <div class="course-title">{titleProps.title}</div>
    <div class="uk-text-muted uk-text-small">{titleProps.subtitle}</div>
  </div>
  <div class="uk-width-1-6@m" />
</div>
