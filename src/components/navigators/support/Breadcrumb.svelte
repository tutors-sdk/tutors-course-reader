<script lang="ts">
  import Icon from "../../iconography/Icon.svelte";
  import type { Lo } from "../../../services/course/lo";
  import { fade, fly } from "svelte/transition";
  import { currentCourse } from "../../../services/course/stores";

  export let lo: Lo;
  let route = lo.route;
  if (lo.type === "unit") {
    if (!route.endsWith(lo.id))
      route += lo.id;
    else {
      route = $currentCourse.lo.route;
    }
  }

  function truncate(input) {
    if (input.length > 26) {
      return input.substring(0, 26) + "...";
    }
    return input;
  }
</script>

<li in:fly="{{ x: -100, duration: 2000 }}" out:fade>
  <a class="font-bold" href="{route}">
    <Icon type="{lo.type}" />
    <span class="hidden text-xs lg:block lg:pl-2">{truncate(lo.title)}</span></a>
</li>

