<script lang="ts">
  import { Lo } from "../../reader-lib/types/lo-types";
  import { convertMd } from "../../reader-lib/utils/markdown-utils";
  // @ts-ignore
  import * as animateScroll from "svelte-scrollto";
  import { generateToc } from "../../reader-lib/utils/markdown-toc-lib";

  export let lo: Lo;
  let contentHtml = "";
  const url = lo.route.replace("/#/note/", "");
  contentHtml = convertMd(lo.contentMd, url);
  contentHtml = generateToc(contentHtml);
</script>

<article class="notecontent">
  {@html contentHtml}
</article>

<style>
  :global(.notecontent pre) {
    color: white;
  }
</style>
