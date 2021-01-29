<script lang="ts">
  import { getContext, onDestroy, onMount } from "svelte";
  import type { Cache } from "../services/course/cache";
  import { navigatorProps, studentsOnline } from "../services/course/stores";
  import type { StudentMetric, User } from "../services/analytics/metrics-types";
  import StudentCard from "../components/cards/StudentCard.svelte";

  let students: StudentMetric[] = [];
  export let params: any = {};
  const cache: Cache = getContext("cache");
  let course = cache.course;
  let title = "";

  function initMainNavigator() {
    navigatorProps.set({
      title: {
        title: "Tutors Live",
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
      })
      studentsOnline.set(cache.course.metricsService.getLiveCount());
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
  }

  function updateStudent(user: User, topic: string, lab: string) {
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
    if (topic) student.topic = topic;
    if (lab) student.lab = lab;
    student.tick++;
    students = [...students];
    studentsOnline.set(cache.course.metricsService.getLiveCount());
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="flex flex-wrap justify-center w-full">
  {#each students as student}
    <StudentCard {student} />
  {/each}
</div>

