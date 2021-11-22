<script lang="ts">
  import { currentCourse } from "../../../stores";
  import IconBar from "../../iconography/IconBar.svelte";
  import { fade, fly} from 'svelte/transition';
</script>

{#if ($currentCourse.authLevel > 0) }
  <span in:fly="{{ y: -20, duration: 1000 }}" out:fade  class="hidden xl:block">
    <IconBar nav={$currentCourse.profileBar} />
  </span>
{/if}
