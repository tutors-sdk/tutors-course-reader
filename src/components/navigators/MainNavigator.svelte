<script lang="ts">
  import TitleCard from "./support/TitleCard.svelte";
  import { currentCourse } from "../../services/course/stores";
  import DarkMode from "./support/DarkMode.svelte";
  import Companions from "./support/Companions.svelte";
  import Parent from "./support/Parent.svelte";
  import Profile from "./support/Profile.svelte";
  import Wall from "./support/Wall.svelte";
  import Search from "./support/Search.svelte";
  import Toc from "./support/Toc.svelte";
</script>

{#if $currentCourse}
  <div class="flex flex-row flex-nowrap justify-center items-center text-center dark:bg-black dark:text-gray-100 space-x-4">
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
