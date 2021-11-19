<script lang="ts">
  import Icon from "./Icon.svelte";
  import type { IconNavBar } from "tutors-reader-lib/src/icons/icon-types";

  export let nav: IconNavBar;
</script>

<div class="iconbar">
  {#each nav.bar as i}
    <span>
      <a href="{i.link}" target="{i.target}">
      <Icon toolTip="{i.tip}" type="{i.icon}" button="true"/>
      </a>
    </span>
  {/each}
</div>
