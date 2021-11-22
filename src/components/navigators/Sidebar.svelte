<script lang="ts">
  import { beforeUpdate, getContext } from "svelte";
  import type { Course } from "tutors-reader-lib/src/course/course";
  import type { CourseService } from "../../services/course-service";
  import CourseNavigator from "./CourseNavigator.svelte";
  import { revealSidebar } from "../../stores";
  import SidebarComponent from "./support/SidebarComponent.svelte";

  let course: Course = null;
  const cache: CourseService = getContext("cache");

  let display = false;
  beforeUpdate(() => {
    course = cache.course;
    if (course) {
      display = true;
    }
  });
</script>

{#if $revealSidebar && display}
  <SidebarComponent title="Course Contents" show={revealSidebar} origin="right-0">
    <CourseNavigator {course} />
  </SidebarComponent>
{/if}
