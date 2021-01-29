<script lang="ts">
  import { fade } from "svelte/transition";
  import Icon from "../iconography/Icon.svelte";
  import type {StudentMetric} from "../../services/analytics/metrics-types"

  export let student:StudentMetric;
</script>

<style>
  .card {
    max-width: 150px;
    min-width: 150px;
    height: auto
  }
</style>

<div class="font-light font-sm text-xs card m-4 block bg-white border shadow-md hover:shadow-xl dark:hover:bg-white dark:hover:text-black rounded-lg overflow-hidden dark:bg-black dark:text-white"
     in:fade={{ duration: 800 }}>
  <div class="p-2  text-center"> {student.name} </div>
  <hr>
  <div class="flex justify-center">
    <img loading="lazy" class="object-scale-down p-1 h-24" src="{student.img}" alt="{student.nickname}">
  </div>
  <hr>
  <div class="p-2 text-center mt-2">
    <p>{student.topic}</p>
    <p>{student.lab}</p>
  </div>
</div>
