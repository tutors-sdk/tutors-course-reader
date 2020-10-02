<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import PdfViewer from "svelte-pdf";
  import { onMount } from "svelte";
  import type { Lo } from "../services/lo";
  import { getRepo } from "../repo";
  import TopicNavigatorCard from "../elements/cards/TopicNavigatorCard.svelte";
  import { dispatchTalkNavProps } from "../elements/navigators/navigator-properties";
  export let params: any = {};
  let courseRepo = getRepo();
  let lo: Lo = null;
  onMount(async () => {
    await courseRepo.fetchCourseFromTalk(params.wild);
    const ref = `/#/talk/${params.wild}`;
    lo = courseRepo.course.talks.get(ref);
    dispatchTalkNavProps(dispatch, courseRepo.course, lo);
  });
</script>

{#if lo}
  <div class="uk-container-expand uk-margin-medium-top uk-margin-medium-left uk-margin-medium-right">
    <div uk-grid uk-flex uk-flex-center>
      <div class="uk-width-expand@m">
        <PdfViewer url={lo.pdf} />
      </div>
      <div class="uk-width-1-5@m uk-flex uk-grid">
        <TopicNavigatorCard topic={lo.parent} />
      </div>
    </div>
  </div>
{/if}
