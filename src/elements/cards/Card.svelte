<script lang="ts">
  import type { Lo } from "../../services/lo";
  export let lo: Lo;
  import CardBody from "./CardBody.svelte";
</script>

<div
  class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline  uk-padding-small uk-box-shadow-xlarge">
  <a href={lo.route}>
    <CardBody {lo} />
  </a>
</div>
