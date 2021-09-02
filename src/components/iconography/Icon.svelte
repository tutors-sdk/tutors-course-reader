<script lang="ts">
  import { getIcon } from "./icon-lib";
  import { HeroIconLib } from "./hero-icons";
  import Icon from "@iconify/svelte";
  import { currentCourse } from "../../services/course/stores";
  import { onDestroy } from "svelte";

  export let type = "default";
  export let toolTip = "";
  export let link = "";
  export let target = "";
  export let button = false;
  export let tipPos = "";
  export let width = 20;
  export let height = 20;

  let tip = "";
  let buttonAttr = "";
  if (toolTip) {
    tip = `tooltip ${tipPos} capitalize`;
  }
  if (button) {
    buttonAttr = "btn btn-square btn-ghost";
  }
  let iconLib = HeroIconLib;

  const unsubscribe = currentCourse.subscribe(course => {
    if (course.lo.properties.iconset) {
      iconLib = course.lo.properties.iconset;
    } else {
      iconLib = HeroIconLib;
    }
  });
  onDestroy(unsubscribe);

</script>

<div data-tip="{toolTip}" class="{tip}">
  <div class="{buttonAttr}">
    {#if link}
      <a target="{target}" href="{link}">
        <Icon icon={getIcon(iconLib, type).icon} class="text-{getIcon(iconLib, type).colour}" width="{width}"
              height="{height}" />
      </a>
    {:else}
      <Icon icon={getIcon(iconLib, type).icon} class="text-{getIcon(iconLib, type).colour}" width="{width}"
            height="{height}" />
    {/if}
  </div>
</div>
