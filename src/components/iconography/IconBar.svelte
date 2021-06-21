<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { IconNavBar } from "./icon-lib";

  export let nav: IconNavBar;
</script>

<ul class="menu shadow-lg bg-neutral rounded-box horizontal text-neutral-content flex-shrink-0">
  {#each nav.bar as i}
  <li data-tip="{i.tip}" class="tooltip tooltip-bottom">
    <a href="{i.link}" target="{i.target}">
      <Icon type="{i.icon}" scale="1.5" />
    </a>
  </li>
  {/each}
</ul>
