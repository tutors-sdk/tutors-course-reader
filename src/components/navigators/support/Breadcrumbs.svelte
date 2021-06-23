<script lang="ts">
  import { currentCourse } from "../../../services/course/stores";
  import { courseUrl } from "../../../services/course/stores";
  import { navigatorProps } from "../../../services/course/stores";
</script>

<div class="text-s breadcrumbs lg:flex-auto text-neutral-content p-3">
    <ul>
      <li>
        <a href="#/course/{$courseUrl}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </a>
      </li>
      <li>
        <a>Semester 1: January-June 2021</a>
      </li>
      <li>Web Development</li>
    </ul>
  </div>