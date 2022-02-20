<script lang="ts">
  import { Lo } from "../../reader-lib/types/lo-types";
  import { convertMd } from "../../reader-lib/utils/markdown-utils";

  export let lo: Lo;
  let contentHtml = "";
  const url = lo.route.replace("/#/note/", "");
  contentHtml = convertMd(lo.contentMd, url);
</script>

<article class="notecontent" >
  {@html contentHtml}
</article>

<style>
  :global(.notecontent pre) {
    color : white;
  }
</style>
