<script lang="ts">
  import type { IconNavBar } from "./icons";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  export let nav: IconNavBar;
</script>



<div class="bg-white border shadow flex justify-center items-center">
    {#each nav.bar as i}
        <a id={i.icon} href={i.link} target={i.target} uk-tooltip="title: {i.tip}; pos: bottom" class="px-1 py-2">
          <Icon class="icon-{i.icon}" data={getIconFromType(i.icon)} scale="1.5" />
        </a>
    {/each}
</div>
