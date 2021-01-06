<script lang="ts">
  import { navigatorProps } from "../../../services/course/stores";
  import Icon from "../../iconography/Icon.svelte";
</script>

{#if $navigatorProps.parent.show == true}
  <Icon type="{$navigatorProps.parent.icon}" link="{$navigatorProps.parent.link}" toolTip="{$navigatorProps.parent.tip}"
        scale="4"></Icon>
{/if}
