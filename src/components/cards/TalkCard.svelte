<script lang="ts">
  import PdfViewer from "../pdf/PdfViewer.svelte";
  import type { Lo } from "../../services/lo";

  export let lo: Lo = null;
</script>

<PdfViewer url={lo.pdf} />
