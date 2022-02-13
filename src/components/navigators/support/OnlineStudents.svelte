<script lang="ts">
  import { currentCourse } from "../../../stores";
  import { getContext, onDestroy } from "svelte";
  import { User } from "../../../reader-lib/types/metrics-types";
  import { Topic } from "../../../reader-lib/models/topic";
  import { Lo } from "../../../reader-lib/types/lo-types";
  import Course from "../../../pages/Course.svelte";

  const metricsService = getContext("metrics");
  let nmrStudents = 0;
  function metricDelete(user: User) {
    nmrStudents--;
  }
  function metricUpdate(user: User, topic: Topic, lab: Lo, time: number) {
    nmrStudents++;
  }
  const unsubscribe =  currentCourse.subscribe((course:Course) => {
    if (course.hasEnrollment()) {
      metricsService.setCourse(course);
      metricsService.subscribeToAllUsers();
      metricsService.startListening(metricUpdate, metricDelete);
    }
  });
  onDestroy(unsubscribe);
</script>

{#if nmrStudents > 2}
  <div class="calendar">
    <div class="text-sm pt-1">Current Week</div>
    <div class="text-l pb-1">{nmrStudents}</div>
  </div>
{/if}
