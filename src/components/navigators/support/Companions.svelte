<script lang="ts">
  import { currentCourse } from "../../../stores";
  import IconBar from "../../iconography/IconBar.svelte";
  import { fade, fly} from 'svelte/transition';
</script>

<div in:fly="{{ y: -20, duration: 1000 }}" out:fade class="hidden lg:block flex-none">
  <IconBar nav={$currentCourse.companions} />
</div>
