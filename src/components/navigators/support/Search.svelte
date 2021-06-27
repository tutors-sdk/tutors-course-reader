<script lang="ts">
  import { courseUrl, currentCourse } from "../../../services/course/stores";
</script>

{#if !$currentCourse.isPortfolio() }
  <div data-tip="Search" class="flex-none tooltip tooltip-bottom">
    <a href="/#/search/{$courseUrl}">
      <button class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             class="inline-block w-6 h-6 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </a>
  </div>
{/if}
