<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import type { Cache } from "../services/course/cache";
  import { live, navigatorProps, studentsOnline } from "../services/course/stores";
  import type { StudentMetric, User } from "../services/analytics/metrics-types";
  import { AnalyticsService } from "../services/analytics/analytics-service";
  import { getUserId } from "../services/analytics/auth-service";
  import { Topic } from "../services/course/topic";
  import type { Lo } from "../services/course/lo";
  import StudentCard from "../components/cards/StudentCard.svelte";

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
        title: `${course.lo.title} Live`,
        subTitle: "Tutors Live Laboratory",
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
    live.set(true);
    course = await cache.fetchCourse(params.wild);
    initMainNavigator();
    studentsOnline.set(0);
    course.metricsService.startListening(metricUpdate, metricDelete);
    const users = course.metricsService.getLiveUsers();
    users.forEach(user => {
      metricUpdate(user, null, null, Date.now());
    });
    studentsOnline.set(course.metricsService.getLiveCount());
    const user = await course.metricsService.fetchUserById(getUserId());
    status = user.onlineStatus === "offline";
    await course.metricsService.subscribeToAllUsers();
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

  function metricUpdate(user: User, topic: Topic, lab: Lo, time:number) {
    if (user.onlineStatus === "offline") return;
    let student = students.find(student => student.nickname === user.nickname);
    if (!student) {
      student = {
        name: user.name,
        nickname: user.nickname,
        img: user.picture,
        topic: null,
        lab: null,
        time: time
      };
      students.push(student);
    }
    student.time = time;
    if (topic) {
      student.topic = topic;
    }
    if (lab) {
      student.lab = lab;
    }
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

<div class="container mx-auto mt-4 mb-4  h-screen">
  <div class="flex flex-wrap justify-center w-full border rounded-lg">
    {#each students as student}
      <StudentCard {student} />
    {/each}
  </div>
</div>
