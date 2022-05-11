<script lang="ts">
  import { currentCourse, currentUser } from "../../../stores";
  import { getContext, onDestroy } from "svelte";
  import { StudentMetric, User } from "../../../reader-lib/types/metrics-types";
  import { PresenceService } from "../../../reader-lib/services/presence-service";
  import { MetricsService } from "../../../reader-lib/services/metrics-service";
  import { Course } from "../../../reader-lib/models/course";
  import StudentCard from "../../cards/StudentCard.svelte";
  import { isAuthenticated } from "../../../reader-lib/utils/auth-utils";

  let status = false;
  let show = false;
  let user: User;

  const metricsService = getContext("metrics");
  let onlineStudents = 0;
  let students: StudentMetric[] = [];
  let lastCourse: Course = null;
  let presenceService: PresenceService = null;

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
      if (user && !user.hasOwnProperty("onlineStatus")) {
        user.onlineStatus = "online";
      } else {
        if (user) status = user.onlineStatus === "online";
      }
    }
  });


  function refresh(refreshedStudents: StudentMetric[]) {
    onlineStudents = refreshedStudents.length;
    students = [...refreshedStudents];
  }

  const unsubscribe = currentCourse.subscribe((course: Course) => {
    if (course.hasEnrollment() && isAuthenticated()) {
      if (course != lastCourse) {
        onlineStudents = 0;
        if (presenceService) presenceService.stop();
        presenceService = new PresenceService(new MetricsService(), students, refresh, null);
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


{#if onlineStudents > 1 && status}
  <div class="tooltip tooltip-bottom" data-tip="See who is online now">
    <label for="my-modal" class="btn btn-primary modal-button">
      <div class="badge badge-md">{onlineStudents} online</div>
    </label>
  </div>
  <input type="checkbox" id="my-modal" class="modal-toggle">
  <div class="modal border-4">
    <div class="container mx-auto mt-4 mb-4 carddeck-bg overflow-y-scroll">
      <h2 class="p-2 text-l text-center font-normal}">
        Online Now </h2>
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
{#if show}
  <div class="hidden lg:block w-auto h-auto pl-2 text-base-content tooltip text-white">
    <div class="tooltip tooltip-bottom" data-tip="Share your Presence & see who is online">
      <label class="cursor-pointer label"> <span class="label-text text-sm text-white mr-2">Share Presence</span> <input
        type="checkbox" class="checkbox checkbox-primary" bind:checked={status} on:click={handleClick}> </label>
    </div>
  </div>
{/if}
