<script lang="ts">
  import type { User } from "../../../reader-lib/types/metrics-types";
  import { getContext } from "svelte";
  import { currentCourse, currentUser } from "../../../stores";
  import { isAuthenticated } from "../../../reader-lib/utils/auth-utils";

  let status = false;
  let show = false;
  let user: User;

  const metricsService = getContext("metrics");

  function handleClick() {
    status = !status;
    metricsService.setOnlineStatus(user, status);
  }

  currentUser.subscribe(async newUser => {
    user = newUser;
    let course = await $currentCourse;
    if (course.hasEnrollment() && isAuthenticated()) {
      show = true;
      metricsService.setCourse(course);
      status = user.onlineStatus === "online";
    }
  });

</script>

{#if show}
  <div class="presence bg-info">
    <div class="text-sm text-white pt-1">Presence
      <input type="checkbox" class="checkbox checkbox-primary" bind:checked={status} on:click={handleClick}>
    </div>
  </div>
<!--  Presence <input type="checkbox" bind:checked={status} on:click={handleClick}>-->
{/if}
