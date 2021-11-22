<script lang="ts">
  import { beforeUpdate, getContext } from "svelte";
  import type { Course } from "tutors-reader-lib/src/course/course";
  import type { CourseService } from "../../services/course-service";
  import { revealInfoBar } from "../../stores";
  import { fade, fly } from "svelte/transition";
  import { convertMd } from "../../../../tutors-reader-lib/src/utils/markdown-utils";

  let course: Course = null;
  const cache: CourseService = getContext("cache");
  let courseInfo = "";
  let display = false;
  beforeUpdate(() => {
    course = cache.course;
    if (course) {
      display = true;
      courseInfo = convertMd(course.lo.contentMd, null);
    }
  });
  let close = function() {
    revealInfoBar.set(false);
  };
</script>

{#if $revealInfoBar}
  <nav>
    {#if display}
      <div class="fixed z-50 inset-0 overflow-hidden" in:fly="{{ x: -1000, duration: 1000 }}" out:fade>
        <div class="absolute inset-0 overflow-hidden">
          <section class="absolute inset-y-0 left-0 max-w-full flex" aria-labelledby="slide-over-heading">
            <div class="w-screen max-w-md">
              <div class="h-full flex flex-col py-6 bg-base-200 text-base-content shadow-xl overflow-y-scroll">
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h2 id="slide-over-heading" class="text-lg font-medium"> Course Information </h2>
                    <div class="ml-3 h-7 flex items-center">
                      <button on:click={() => close()}  class="bg-base-content rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="sr-only">Close panel</span>
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-6 relative flex-1 px-4 sm:px-6 prose">
                  {@html courseInfo}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    {/if}
  </nav>
{/if}
