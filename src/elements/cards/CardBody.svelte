<script lang="ts">
  import type { Lo } from "../../services/lo";
  export let lo: Lo;
</script>

<div class="uk-width-expand@m">
  <div class="card-title">{lo.title}</div>
</div>
<div class="uk-width-1-4@m">
  <icon type={lo.type} size="2x" />
</div>
<div class="uk-card-footer">
  <div class="uk-card-body"><img src={lo.img} alt="lo.title" /></div>
</div>
<div class="uk-card-footer">
  <div class="card-body ">
    {@html lo.summary}
  </div>
</div>
