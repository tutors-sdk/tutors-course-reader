<script lang="ts">
  import PdfViewer from "svelte-pdf";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import type { Lo } from "../../services/lo";

  export let lo: Lo = null;
</script>

<div class="uk-card uk-card-default uk-box-shadow-xlarge">
  <div class="uk-card-header">
    <div uk-grid>
      <div class="uk-width-expand@m">
        <div class="card-title">
          {lo.title}
          <a href={lo.pdf} target="_blank">
            <Icon data={getIconFromType('pdf')} scale="1" />
          </a>
        </div>
      </div>
      <div>
        <Icon class="icon-{lo.type}" data={getIconFromType(lo.type)} scale="2" />
      </div>
    </div>
  </div>
  <div class="uk-card-body  uk-padding-remove">
    <div class="uk-card-body  uk-padding-remove">
      <PdfViewer url={lo.pdf} />
    </div>
  </div>
</div>
