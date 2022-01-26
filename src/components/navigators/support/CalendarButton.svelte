<script lang="ts">
  import { currentCourse, revealCalendar } from "../../../stores";
  import { Course } from "tutors-reader-lib/src/course/course";
  import Icon from "../../iconography/Icon.svelte";

  let bgColour = "bg-base-100";
  let course: Course;

  currentCourse.subscribe(async current => {
    course = current;
    switch (course?.currentWeek?.type) {
      case "tuition":
        bgColour = "bg-warning";
        break;
      case "reading":
        bgColour = "bg-info";
        break;
      default:
        bgColour = "bg-base-100";
    }
  });
</script>

{#if $currentCourse.currentWeek}
  <button on:click={() => revealCalendar.set(true)}>
    <Icon type="calendar" toolTip="Full Calendar" button="true" tipPos="tooltip-left"></Icon>
  </button>
  <div class="calendar {bgColour}">
    <div class="text-sm pt-1">Current Week</div>
    <div class="text-l pb-1">{$currentCourse.currentWeek.title}</div>
  </div>
{/if}
