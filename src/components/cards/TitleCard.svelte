<script lang="ts">
  import TutorsIcon from "../iconography/TutorsIcon.svelte";
  import { navigatorProps, week } from "../../services/course/stores";
</script>

<div class="uk-width-3-5@m  uk-card uk-card-default uk-padding-small uk-visible@m">
  <div class="uk-flex uk-flex-center uk-flex-middle  uk-grid uk-padding-remove">
    <div class="uk-width-1-6@m"><img src={$navigatorProps.title.img} width="60" alt="img" /></div>
    <div class="uk-width-expand@m uk-text-left">
      <div class="course-title">{$navigatorProps.title.title}</div>
      <div class="uk-text-muted uk-text-small">{$navigatorProps.title.subTitle}</div>
    </div>
    {#if $week}
      <div class="uk-width-1-6@m">
        <div class="uk-card uk-card-small uk-card-default uk-card-hover uk-text-center uk-padding-remove">
          <div class="uk-card-header">
            <div class="uk-text-bold"> Week <span class="uk-text-large"> {$week.title} </span>  </div>
            <div class="uk-text-small uk-text-light"> ({$week.type}) </div>
          </div>
        </div>
      </div>
    {/if}
    <div class="uk-width-1-6@m">
      <TutorsIcon />
    </div>
  </div>
</div>
