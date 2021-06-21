<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { IconNavBar } from "./icon-lib";

  export let nav: IconNavBar;
</script>

<ul class="menu shadow-lg bg-neutral rounded-box horizontal text-neutral-content flex-shrink-0 mr-2">
  {#each nav.bar as i}
  <li data-tip="{i.tip}" class="tooltip tooltip-bottom">
    <a href="{i.link}" target="{i.target}">
      <Icon type="{i.icon}" scale="1.5" />
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clip-rule="evenodd" />
      </svg>
    </a>
  </li>
  {/each}
</ul>
