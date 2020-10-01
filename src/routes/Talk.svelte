<script lang="ts">
  import PdfViewer from "svelte-pdf";
  import { onMount } from "svelte";
  import type { Lo } from "../services/lo";
  import { getRepo } from "../repo";
  export let params: any = {};
  console.log(params);
  let courseRepo = getRepo();
  console.log(courseRepo);
  let lo: Lo = null;
  onMount(async () => {
    await courseRepo.fetchCourseFromTalk(params.wild);
    const ref = `/#/talk/${params.wild}`;
    console.log(ref);
    lo = courseRepo.course.talks.get(ref);
    console.log(lo);
  });
</script>

{#if lo}
  <div class="uk-container-expand uk-margin-medium-top uk-margin-medium-left uk-margin-medium-right">
    <div uk-grid uk-flex uk-flex-center>
      <div class="uk-width-expand@m" />
      <PdfViewer url={lo.pdf} />
      <div class="uk-width-1-5@m uk-flex uk-grid" />
    </div>
  </div>
{/if}
