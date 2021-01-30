<script lang="ts">
  import { fade } from "svelte/transition";
  import type { StudentMetric } from "../../services/analytics/metrics-types";

  export let student: StudentMetric;
</script>

<style>
  .card {
    max-width: 150px;
    min-width: 150px;
    height: auto
  }
</style>

<div
  class="font-light font-sm card m-4 block bg-white border shadow-md hover:shadow-xl dark:hover:bg-white dark:hover:text-black rounded-lg overflow-hidden dark:bg-black dark:text-white"
  in:fade={{ duration: 800 }}>
  <div class="text-center"> {student.name} </div>
  <hr>
  <div class="flex justify-center">
    <img loading="lazy" class="object-scale-down p-1 h-24" src="{student.img}" alt="{student.nickname}">
  </div>
  <hr>
  <div class="p-2 text-center text-xs">
    <div class="italic p-2"> {new Date(student.time).toLocaleTimeString()} </div>
    <hr>
    {#if student.topic }
      <div><span class="italic"> Topic:&nbsp</span>{student.topic.lo.title}</div>
    {/if}
    {#if student.lab }
      <div><span class="italic"> Lab:&nbsp</span>{student.lab.title}</div>
    {/if}
  </div>
</div>
