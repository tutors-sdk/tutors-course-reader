<script lang="ts">
  import TutorsIcon from "../../iconography/TutorsIcon.svelte";
  import { navigatorProps, studentsOnline } from "../../../services/course/stores";
</script>

<div
  class="bg-white border shadow justify-center items-center flex  rounded-lg p-4 ml-1 mt-1 dark:bg-black dark:text-gray-100">
  <div class="hidden md:block w-1/6"><img src={$navigatorProps.title.img} width="60" alt="img" /></div>
  <div class="w-2/3">
    <div class="text-2xl">{$navigatorProps.title.title}</div>
    <div class="hidden md:block">
      <div class="text-sm">{$navigatorProps.title.subTitle}</div>
    </div>
  </div>
  <div class=" border rounded-lg bg-blue-200 dark:text-gray-900">
    <div class="py-2 px-4">
      <div class="text-lg font-light"> {$studentsOnline} </div>
      <div class="text-sm font-light"> Online</div>
    </div>
  </div>
  <div class="hidden lg:block py-2 px-4 w-1/6">
    <TutorsIcon />
  </div>
</div>
