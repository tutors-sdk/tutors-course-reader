<script lang="ts">
  import type { IconNavBar } from "./icons";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  export let nav: IconNavBar;
</script>

<div class="uk-card uk-card-default uk-padding-small uk-border-rounded">
  <ul class="uk-iconnav">
    {#each nav.bar as i}
      <li>
        <a id={i.icon} href={i.link} target={i.target} uk-tooltip="title: {i.tip}; pos: bottom">
          <Icon class="icon-{i.icon}" data={getIconFromType(i.icon)} scale="1.5" />
        </a>
      </li>
    {/each}
  </ul>
</div>
