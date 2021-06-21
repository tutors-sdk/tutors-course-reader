<script lang="ts">
  import TitleCard from "./support/TitleCard.svelte";
  import {
    currentCourse,
    live
  } from "../../services/course/stores";
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
    <div class="flex">
    <div class="hidden lg:block container mx-auto text-right">
  <div class="shadow-lg bg-neutral rounded-box horizontal text-neutral-content flex-auto">
      <div class="text-s breadcrumbs lg:flex-auto text-neutral-content p-3">
        <ul>
          <li>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>
          </li>
          <li>
            <a>Semester 1: January-June 2021</a>
          </li>
          <li>Web Development</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="shadow-lg bg-neutral rounded-box horizontal text-neutral-content flex-none ml-2">
    <Companions />
  </div>
  <div class="shadow-lg bg-neutral rounded-box horizontal text-neutral-content flex-none ml-2">
  <Wall />
  </div>  
  <div class="shadow-lg bg-neutral rounded-box horizontal text-neutral-content flex-none ml-2">
  <Profile />
</div>
  
</div>
  </div>
  {/if}
  
{/if}