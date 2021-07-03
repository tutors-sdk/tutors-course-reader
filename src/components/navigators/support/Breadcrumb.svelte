<script lang="ts">
  import Icon from "../../iconography/Icon.svelte";
  import type { Lo } from "../../../services/course/lo";

  export let lo: Lo;
  let unitId = "";
  if (lo.type === "unit") {
    unitId = lo.id;
  }
</script>

<li>
  <a class="btn btn-sm capitalize" href="{lo.route}{unitId}">
    <Icon type="{lo.type}" />
    <span class="hidden lg:block lg:pl-2">{lo.title}</span></a>
</li>

