<script lang="ts">
  import { profile } from "../../../services/course/stores";
  import IconBar from "../../iconography/IconBar.svelte";
</script>

{#if $profile.show}
  <IconBar nav={$profile} />
{/if}
