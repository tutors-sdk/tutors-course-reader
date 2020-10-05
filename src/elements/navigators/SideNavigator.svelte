<script lang="ts">
  import CourseNavigator from "./CourseNavigator.svelte";
  import type { Course } from "../../services/course";
  export let course: Course = null;
</script>

<div class="uk-offcanvas-content">
  <div id="course-navigator" uk-offcanvas="mode: reveal; overlay: true">
    <div class="uk-offcanvas-bar">
      <button class="uk-offcanvas-close" type="button" uk-close />
      <CourseNavigator {course} />
    </div>
  </div>
</div>
