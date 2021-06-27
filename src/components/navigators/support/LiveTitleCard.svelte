<script lang="ts">
  import TutorsIcon from "../../iconography/TutorsIcon.svelte";
  import { currentLo, studentsOnline } from "../../../services/course/stores";
</script>

{#if $currentLo}
  <div
    class="bg-white border justify-center items-center flex  rounded-lg p-4 ml-1 mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
    <div class="w-2/3">
      <div class="text-2xl">{$currentLo.title}</div>
      <div class="hidden md:block"></div>
    </div>
    <div class=" border rounded-lg bg-blue-200 dark:text-gray-900 dark:border-gray-700">
      <div class="py-2 px-4">
        <div class="text-lg font-light"> {$studentsOnline} </div>
        <div class="text-sm font-light"> Online</div>
      </div>
    </div>
    <div class="hidden lg:block py-2 px-4 w-1/6">
      <TutorsIcon />
    </div>
  </div>
{/if}
