<script lang="ts">
  import TitleCard from "./support/TitleCard.svelte";
  import { currentCourse, live, showTitle } from "../../services/course/stores";
  import DarkMode from "./support/DarkMode.svelte";
  import Breadcrumbs from "./support/Breadcrumbs.svelte";
  import Companions from "./support/Companions.svelte";
  import Profile from "./support/Profile.svelte";
  import Wall from "./support/Wall.svelte";
  import Search from "./support/Search.svelte";
  import Toc from "./support/Toc.svelte";
  import LiveNavigator from "./support/LiveNavigator.svelte";
  import TutorsIcon from "../iconography/TutorsIcon.svelte";
  import { fade, fly } from "svelte/transition";
  import Compact from "./support/Compact.svelte";
</script>

{#if $currentCourse && $live}
  <LiveNavigator />
{:else}
  {#if $currentCourse}
    <div class="mb-2 pt-6 md:sticky md:top-0 md:z-40">
      {#if $showTitle}
        <div in:fly="{{ y: -100, duration: 1000 }}" out:fly="{{ y: -100, duration: 500 }}" class="navbar shadow-lg bg-neutral text-neutral-content rounded-box mb-2 p-4 justify-center">
          <TitleCard />
          <Search />
          <TutorsIcon />
          <DarkMode />
          <Compact/>
          <Toc />
        </div>
      {/if}
      <div class="flex flex-wrap lg:flex-nowrap">
        {#if !$currentCourse.isPortfolio() }
          <Breadcrumbs />
          <Companions />
          <Wall />
          <Profile />
        {/if}
      </div>
    </div>
  {/if}
{/if}
