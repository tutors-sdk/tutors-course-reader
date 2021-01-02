<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { IconNavBar } from "./icon-lib";

  export let nav: IconNavBar;
</script>

<div class="bg-white border rounded shadow flex justify-center items-center dark:bg-black dark:text-white">
  {#each nav.bar as i}
    <div class="px-1 py-2">
      <Icon type="{i.icon}" link="{i.link}" target="{i.target}" toolTip="{i.tip}" scale="1.5" />
    </div>
  {/each}
</div>
