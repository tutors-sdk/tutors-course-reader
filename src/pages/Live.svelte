<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import type { Cache } from "../services/course/cache";
  import { navigatorProps, studentsOnline } from "../services/course/stores";
  import type { StudentMetric, User } from "../services/analytics/metrics-types";
  import StudentCard from "../components/cards/StudentCard.svelte";
  import { AnalyticsService } from "../services/analytics/analytics-service";
  import { getUserId } from "../services/analytics/auth-service";
  import { Topic } from "../services/course/topic";
  import type { Lo } from "../services/course/lo";

  let students: StudentMetric[] = [];
  export let params: any = {};
  const cache: Cache = getContext("cache");
  const analytics: AnalyticsService = getContext("analytics");

  let course = cache.course;
  let title = "";
  let status = false;

  function initMainNavigator() {
    navigatorProps.set({
      title: {
        title: `Tutors Live`,
        subTitle: course.lo.title,
        img: course.lo.img
      },
      parent: {
        show: true,
        icon: "moduleHome",
        link: `#/course/${cache.course.url}`,
        tip: "To module home ..."
      }
    });
    title = `${course.lo.title} :Live`;
  }

  onMount(async () => {
    course = await cache.fetchCourse(params.wild);
    initMainNavigator();
    studentsOnline.set(0);
    if (course) {
      course.metricsService.startListening(metricUpdate, metricDelete);
      const users = course.metricsService.getLiveUsers();
      users.forEach(user => {
        metricUpdate(user, null, null);
      });
      studentsOnline.set(course.metricsService.getLiveCount());
      const user = await course.metricsService.fetchUserById(getUserId());
      status = user.onlineStatus === "offline";
    }
  });

  onDestroy(async () => {
    cache.course.metricsService.stopListening();
  });

  function metricDelete(user: User) {
    let student = students.find(student => student.nickname === user.nickname);
    let index = students.indexOf(student);
    if (index !== -1) {
      students.splice(index, 1);
    }
    students = [...students];
  }

  function metricUpdate(user: User, topic: Topic, lab: Lo) {
    if (user.onlineStatus === "offline") return;
    let student = students.find(student => student.nickname === user.nickname);
    if (!student) {
      student = {
        name: user.name,
        nickname: user.nickname,
        img: `https://github.com/${user.nickname}.png`,
        topic: null,
        lab: null,
        tick: 0
      };
      students.push(student);
    }

    if (topic) {
      student.topic = topic;
    }
    if (lab) {
      student.lab = lab;
    }
    student.tick++;
    students = [...students];
    studentsOnline.set(course.metricsService.getLiveCount());
  }

  function handleClick() {
    analytics.setOnlineStatus(course, status);
  }

</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="flex flex-wrap justify-between w-full">
  <divn class="mx-4">
    Online : {$studentsOnline}
  </divn>
  <div class="mx-4">
    Appear Offline : <input type="checkbox" bind:checked={status} on:click={handleClick}>
  </div>
</div>
<div class="flex flex-wrap justify-center w-full">
  {#each students as student}
    <StudentCard {student} />
  {/each}
</div>
