<script lang="ts">
  import type { IconNavBar } from "./icons";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  export let nav: IconNavBar;
</script>

<div class="uk-card uk-card-default uk-padding-small">
  <ul class="uk-iconnav">
    {#each nav.bar as i}
      <li>
        <a id={i.icon} href={i.link} target={i.target} title={i.tip} pos="bottom" uk-tooltip>
          <Icon class="icon-{i.icon}" data={getIconFromType(i.icon)} scale="2" />
        </a>
      </li>
    {/each}
  </ul>
</div>
