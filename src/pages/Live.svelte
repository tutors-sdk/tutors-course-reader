<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import type { Cache } from "../services/course/cache";
  import { navigatorProps, studentsOnline } from "../services/course/stores";
  import type { StudentMetric, User } from "../services/analytics/metrics-types";
  import StudentCard from "../components/cards/StudentCard.svelte";
  import { AnalyticsService } from "../services/analytics/analytics-service";
  import { getUserId } from "../services/analytics/auth-service";

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
    if (cache.course) {
      cache.course.metricsService.startListening(labUpdate, topicUpdate, metricDelete);
      const users = cache.course.metricsService.getLiveUsers();
      users.forEach(user => {
        updateStudent(user, "", "");
      });
      studentsOnline.set(cache.course.metricsService.getLiveCount());
      const user = await cache.course.metricsService.fetchUserById(getUserId());
      status = user.onlineStatus === "offline";
    }
  });

  onDestroy(async () => {
    cache.course.metricsService.stopListening();
  });

  function topicUpdate(user: User, topicTitle: string) {
    updateStudent(user, topicTitle, "");
  }

  function labUpdate(user: User, lab: string) {
    updateStudent(user, "", lab);
  }

  function metricDelete(user: User) {
    let student = students.find(student => student.nickname === user.nickname);
    let index = students.indexOf(student);
    if (index !== -1) {
      students.splice(index, 1);
    }
    students = [...students];
  }

  function updateStudent(user: User, topic: string, lab: string) {
    if (user.onlineStatus === "offline") {
      let student = students.find(student => student.nickname === user.nickname);
      let index = students.indexOf(student);
      if (index !== -1) {
        students.splice(index, 1);
      }
    }
    else {
      let student = students.find(student => student.nickname === user.nickname);
      if (!student) {
        student = {
          name: user.name,
          nickname: user.nickname,
          img: `https://github.com/${user.nickname}.png`,
          topic: "",
          lab: "",
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
    }
    students = [...students];
    studentsOnline.set(cache.course.metricsService.getLiveCount());
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
