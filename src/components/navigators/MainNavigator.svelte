<script lang="ts">
  import TitleCard from "./support/TitleCard.svelte";
  import { currentCourse } from "../../stores";
  import DarkMode from "./support/ThemeSwitch.svelte";
  import Breadcrumbs from "./support/Breadcrumbs.svelte";
  import Companions from "./support/Companions.svelte";
  import Profile from "./support/Profile.svelte";
  import Wall from "./support/Wall.svelte";
  import Search from "./support/Search.svelte";
  import Toc from "./support/Toc.svelte";
  import TutorsIcon from "./support/TutorsIcon.svelte";
  import { fly } from "svelte/transition";
  import Compact from "./support/Compact.svelte";
</script>

{#if $currentCourse}
  <div class="header-container">
    <div in:fly="{{ y: -100, duration: 1000 }}" out:fly="{{ y: -100, duration: 500 }}" class="navbar">
      <TitleCard />
      <Search />
      <TutorsIcon />
      <DarkMode />
      <Compact />
      <Toc />
    </div>
    <div class="navbar-secondary">
      {#if !$currentCourse.isPortfolio() }
        <Breadcrumbs />
        <Companions />
        <Wall />
        <Profile />
      {/if}
    </div>
  </div>
{/if}

