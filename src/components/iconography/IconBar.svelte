<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { IconNavBar } from "./icon-lib";

  export let nav: IconNavBar;
</script>
{#each nav.bar as i}
  <ul data-tip="{i.tip}" class="flex-none tooltip tooltip-bottom">
    <a href="{i.link}" target="{i.target}">
      <li class="btn btn-square btn-ghost">
        <Icon type="{i.icon}" />
      </li>
    </a>
  </ul>
{/each}
