<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { IconNavBar } from "./icon-lib";

  export let nav: IconNavBar;
</script>

<div class="shadow-lg bg-neutral text-neutral-content rounded-box horizontal flex-none ml-2">
  {#each nav.bar as i}
    <li class="btn btn-square btn-ghost">
      <Icon toolTip="{i.tip}" type="{i.icon}" link="{i.link}" target="{i.target}" />
    </li>
  {/each}
</div>
