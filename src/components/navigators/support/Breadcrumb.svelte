<script lang="ts">
  import Icon from "../../iconography/Icon.svelte";
  import type { Lo } from "../../../services/course/lo";
  import { fade, fly } from "svelte/transition";

  export let lo: Lo;
  let unitId = "";
  if (lo.type === "unit") {
    unitId = lo.id;
  }

  function truncate(input) {
    if (input.length > 26) {
      return input.substring(0, 26) + "...";
    }
    return input;
  };
</script>

<li in:fly="{{ x: -100, duration: 2000 }}" out:fade>
  <a class="btn btn-sm capitalize -ml-4 -mr-3" href="{lo.route}{unitId}">
    <Icon type="{lo.type}" />
    <span class="hidden lg:block lg:pl-2">{truncate(lo.title)}</span></a>
</li>

