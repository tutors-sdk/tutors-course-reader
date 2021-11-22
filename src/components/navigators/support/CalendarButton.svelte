<script lang="ts">
  import CalendarCard from "../../cards/CalendarCard.svelte";
  import { currentCourse } from "../../../stores";
  import { Course } from "tutors-reader-lib/src/course/course";

  let bgColour = "bg-base-100";
  let course: Course;

  currentCourse.subscribe(async current => {
    course = current;
    switch (course?.currentWeek?.type) {
      case "tuition":
        bgColour = "bg-success";
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
  <div data-tip="Module Calendar"
       class="hidden lg:block w-auto h-auto pl-4 pr-4 button button-lg rounded-xl {bgColour} text-base-content tooltip">
    <label for="title-modal" class="modal-button">
      <div class="text-sm pt-1">current week</div>
      <div class="text-l pb-1">{$currentCourse.currentWeek.title}</div>
    </label> <input type="checkbox" id="title-modal" class="modal-toggle">
    <CalendarCard />
  </div>
{/if}
