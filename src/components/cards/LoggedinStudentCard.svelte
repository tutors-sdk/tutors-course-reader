<script lang="ts">
  import { fade } from "svelte/transition";
  import { AnalyticsService } from "../../services/analytics/analytics-service";
  import { getContext, onMount } from "svelte";
  import { currentCourse } from "../../services/course/stores";
  import { getUserId } from "../../services/analytics/auth-service";
  import type { User } from "../../services/analytics/metrics-types";

  const analytics: AnalyticsService = getContext("analytics");
  let status = false;
  let user: User;

  onMount(async () => {
    user = await $currentCourse.metricsService.fetchUserById(getUserId());
    status = user.onlineStatus === "offline";
  });

  function handleClick() {
    analytics.setOnlineStatus($currentCourse, status);
  }

</script>

<style>
  .card {
    max-width: 150px;
    min-width: 100px;
    height: auto
  }
</style>

{#if user}
  <div
    class="font-light font-sm card m-4 block bg-white border shadow-md hover:shadow-xl dark:hover:bg-white dark:hover:text-black rounded-lg overflow-hidden dark:bg-black dark:text-white"
    in:fade={{ duration: 800 }}>
    <div class="text-center"> {user.name} </div>
    <hr>
    <div class="flex justify-center">
      <img loading="lazy" class="object-scale-down p-1 h-24" src="{user.picture}" alt="{user.nickname}">
    </div>
    <hr>
    <div class="p-2 text-center text-xs">
      Appear Offline : <input type="checkbox" bind:checked={status} on:click={handleClick}>
    </div>
  </div>
{/if}
