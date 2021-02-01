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
  <div
    class="flex flex-row flex-nowrap justify-center items-center text-center dark:bg-black dark:text-gray-100 space-x-4">
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
{:else}
  {#if $currentCourse}
    <div
      class="flex flex-row flex-nowrap justify-center items-center text-center dark:bg-black dark:text-gray-100 space-x-4">
      <Companions />
      <Parent />
      <TitleCard />
      <div class="hidden md:block">
        <div class="flex flex-row items-center justify-center space-x-4">
          <DarkMode />
          <Wall />
          <Search />
          <Profile />
        </div>
      </div>
      <Toc />
    </div>
  {/if}
{/if}
