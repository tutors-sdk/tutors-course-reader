<script lang="ts">
  import type { IconNavBar } from "./icons";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";

  export let nav: IconNavBar;
</script>

<div class="bg-white border rounded shadow flex justify-center items-center dark:bg-black dark:text-white">
  {#each nav.bar as i}
    <a id={i.icon} href={i.link} target={i.target} class="px-1 py-2 tooltip"> <span class="tooltip-text"> {i.tip}</span>
      <Icon class="icon-{i.icon}" data={getIconFromType(i.icon)} scale="1.5" />
    </a>
  {/each}
</div>
