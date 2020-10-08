<script lang="ts">
  import VideoCard from "../cards/VideoCard.svelte";
  import type { Lo } from "../../services/lo";
  export let videos: Lo[] = [];
</script>

{#each videos as video}
  <VideoCard lo={video} />
{/each}
