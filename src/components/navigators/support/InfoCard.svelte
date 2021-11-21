<script lang="ts">
  import { currentCourse } from "../../../stores";
  import { Course } from "../../../../../tutors-reader-lib/src/course/course";
  let courseInfo = ""
  let course: Course;
  currentCourse.subscribe(async current=> {
    if (current) {
      course = current;
      courseInfo = course.contentMd
    }
  });

</script>

<div class="modal">
  <div class="modal-box">
    {@html info}
    <br> <label for="title-modal" class="btn">CLOSE</label>
  </div>
</div>
