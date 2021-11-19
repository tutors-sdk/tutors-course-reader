<script lang="ts">
  import { getContext } from "svelte";
  import type { AnalyticsService } from "../services/analytics-service";
  import type { CourseService } from "../services/course-service";
  import CardDeck from "../components/cards/CardDeck.svelte";
  import type { Lo } from "tutors-reader-lib/src/course/lo";
  import { currentLo, live } from "../stores";
  import { Wave } from "svelte-loading-spinners";

  let los: Lo[] = [];

  const cache: CourseService = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");
  let refresh = false;
  let loading = true;
  let tickerTape = "Loading...";
  let courseNmr = 0;
  let total = 0;

  $ : total = courseNmr;
  let title = "All known Modules";

  async function getAllCourses() {
    live.set(true);
    const courses = await analytics.fetchAllCourseList();
    for (let i = 0; i < courses.length; i++) {
      const courseLo = await cache.fetchCourse(`${courses[i].url}.netlify.app`);
      if (courseLo != null) {
        if (courses[i].visits > 20) {
          courseNmr++;
          courseLo.lo.route = `https://tutors-svelte.netlify.app//#/course/${courses[i].url}.netlify.app`;
          courseLo.lo.summary = `Page views: ${courses[i].visits} <br> <small>Last access <br> ${courses[i].last} <small>`;
          courseLo.lo.type = "web";
          los.push(courseLo.lo);
        }
        tickerTape = courseLo.lo.title;
      }
      else {
        analytics.deleteCourseFromList(`${courses[i].url}`)
      }
    }
    refresh = !refresh;
    loading = false;
    // noinspection TypeScriptValidateTypes
    currentLo.set({ title: `${courseNmr} Known Tutors Modules`, type: "tutors", parentLo: null, img: null });
    return courses;
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="container mx-auto">
  {#await getAllCourses() }
    <div class="border rounded-lg overflow-hidden mt-4 dark:border-gray-700">
      <div class="flex border justify-center items-center dark:border-gray-700">
        <Wave size="280" color="#FF3E00" unit="px" />
      </div>
    </div>
    {total} : {tickerTape}
  {:then courses}
    <CardDeck los={los} />
  {/await}
</div>

