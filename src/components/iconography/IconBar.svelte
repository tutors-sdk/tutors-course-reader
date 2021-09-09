<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { IconNavBar } from "./themes";

  export let nav: IconNavBar;
</script>

<div class="flex-wrap lg:flex-none shadow-lg bg-neutral text-neutral-content rounded-box horizontal ml-1 mt-2 lg:mt-0">
  {#each nav.bar as i}
    <span>
      <a href="{i.link}" target="{i.target}">
      <Icon toolTip="{i.tip}" type="{i.icon}" button="true"/>
      </a>
    </span>
  {/each}
</div>
