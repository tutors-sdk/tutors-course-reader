<script lang="ts">
  import TitleCard from "./support/TitleCard.svelte";
  import { currentCourse, live } from "../../services/course/stores";
  import DarkMode from "./support/DarkMode.svelte";
  import Companions from "./support/Companions.svelte";
  import Parent from "./support/Parent.svelte";
  import Profile from "./support/Profile.svelte";
  import Wall from "./support/Wall.svelte";
  import Search from "./support/Search.svelte";
  import Toc from "./support/Toc.svelte";
  import ClockCard from "../cards/ClockCard.svelte";
  import LoggedinStudentCard from "../cards/LoggedinStudentCard.svelte";
  import LiveTitleCard from "./support/LiveTitleCard.svelte";
</script>
{#if $currentCourse && $live}
<div class="container mx-auto p-8">
  <div
    class="flex flex-row flex-nowrap justify-center items-center text-center dark:bg-gray-900 dark:text-gray-100 space-x-4">
    <div class="hidden lg:block w-1/6">
      <LoggedinStudentCard />
    </div>
    <div class="w-4/6">
      <LiveTitleCard />
    </div>
    <div class="hidden lg:block">
      <DarkMode />
    </div>
    <div class="w-1/6">
      <ClockCard />
    </div>
  </div>
</div>
{:else}
  {#if $currentCourse}
  <div class="container mx-auto pt-4">
  <div class="navbar shadow-lg bg-neutral text-neutral-content rounded-box mb-4 justify-center">
    <div class="flex">
      <Parent />
    </div>
      <TitleCard />
      <Search />
      <DarkMode />
      <Toc />
    </div>
    <div class="hidden lg:block container mx-auto text-right">
  <Companions />
  <Wall />
  
</div>
  <Profile />
  </div>
  {/if}
  
{/if}
