<script lang="ts">
  import { fade } from "svelte/transition";
  import type { StudentMetric } from "../../services/analytics/metrics-types";

  export let student: StudentMetric;
</script>

<style>
  .card {
    max-width: 200px;
    min-width: 200px;
    height: auto
  }
</style>

<div
  class="font-light font-sm card m-4 block bg-white border dark:hover:bg-gray-800 dark:border-gray-700 rounded-lg overflow-hidden dark:bg-gray-900 dark:text-white"
  in:fade={{ duration: 800 }}>
  <div class="text-center p-1"> {student.name} </div>
  <hr>
  <div class="grid grid-cols-2 gap-1">
    <div>
      <img loading="lazy" class="object-scale-down  h-24" src="{student.img}" alt="{student.nickname}">
    </div>
    <div>
      <img loading="lazy" class="object-scale-down  h-24" src="{student.topic.lo.img}" alt="{student.nickname}">
    </div>
    <div>
      {#if student.lab }
        <img loading="lazy" class="object-scale-down  h-24" src="{student.lab.img}" alt="{student.nickname}">
      {/if}
    </div>
    <div class="text-xs text-center">
      <div class="italic mt-2">
        {new Date(student.time).toLocaleTimeString()}
      </div>
      <hr>
      <div class="mt-2">
        {#if student.topic }
          <div><span class="italic"> </span>{student.topic.lo.title}</div>
        {/if}
        {#if student.lab }
          <div><span class="italic"> </span>{student.lab.title}</div>
        {/if}
      </div>
    </div>
  </div>
</div>
