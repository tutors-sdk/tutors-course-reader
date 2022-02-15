<script lang="ts">
  import { currentCourse } from "../../../stores";
  import { onDestroy } from "svelte";
  import { StudentMetric } from "../../../reader-lib/types/metrics-types";
  import { PresenceService } from "../../../reader-lib/services/presence-service";
  import { MetricsService } from "../../../reader-lib/services/metrics-service";
  import { Course } from "../../../reader-lib/models/course";
  import StudentCard from "../../cards/StudentCard.svelte";

  let onlineStudents = 0;
  let students: StudentMetric[] = [];
  let lastCourse: Course = null;
  let presenceService: PresenceService = null;

  function refresh(refreshedStudents: StudentMetric[]) {
    onlineStudents = refreshedStudents.length;
    students = [...refreshedStudents];
  }

  const unsubscribe = currentCourse.subscribe((course: Course) => {
    if (course.hasEnrollment()) {
      if (course != lastCourse) {
        onlineStudents = 0;
        if (presenceService) presenceService.stop();
        presenceService = new PresenceService(new MetricsService(), students, refresh);
        lastCourse = course;
        presenceService.setCourse(course);
        presenceService.start();
      }
    } else {
      if (presenceService) presenceService.stop();
      lastCourse = null;
      onlineStudents = 0;
    }
  });
  onDestroy(async () => {
    if (presenceService) presenceService.stop();
  });
</script>

{#if onlineStudents > 1}
  <label for="my-modal" class="btn btn-primary btn-outline modal-button">
    <div class="badge badge-primary badge-lg text-sm"> {onlineStudents} Online</div>
  </label>

  <input type="checkbox" id="my-modal" class="modal-toggle">
  <div class="modal border-4">
    <div class="container mx-auto mt-4 mb-4 carddeck-bg">
      <h2  class="p-2 text-l text-center font-normal}">
        Online Now
      </h2>
      <div class="col-span-6 wall-bg">
        {#each students as student}
          <StudentCard {student} />
        {/each}
      </div>
      <div class="modal-action">
        <label for="my-modal" class="btn">close</label>
      </div>
    </div>
  </div>
{/if}
