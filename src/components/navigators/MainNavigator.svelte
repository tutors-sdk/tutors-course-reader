<script lang="ts">
  import TitleCard from "./support/TitleCard.svelte";
  import { currentCourse, portfolio } from "../../stores";
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
  import Avatar from "./support/Avatar.svelte";
  import Info from "./support/Info.svelte";
</script>

{#if $currentCourse}
  <div class="header-container">
    <div in:fly="{{ y: -100, duration: 1000 }}" out:fly="{{ y: -100, duration: 500 }}" class="navbar">
      <Info/>
      <TitleCard />
      <Search />
      <TutorsIcon />
      <DarkMode />
      <Compact />
      <Avatar/>
      <Toc />
    </div>
    <div class="navbar-secondary">
      {#if !$currentCourse.isPortfolio() && !$portfolio}
        <Breadcrumbs />
        <Companions />
        <Wall />
      {/if}
    </div>
  </div>
{/if}

