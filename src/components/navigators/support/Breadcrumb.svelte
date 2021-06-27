<script lang="ts">
  import Icon from "../../iconography/Icon.svelte";
  import type { Lo } from "../../../services/course/lo";

  export let lo: Lo;
</script>

<li>
  <a href="{lo.route}">
    <Icon type="{lo.type}" />
    &nbsp {lo.title}</a>
</li>
