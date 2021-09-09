<script>
  import LoggedinStudentCard from "../../cards/LoggedinStudentCard.svelte";
  import LiveTitleCard from "./LiveTitleCard.svelte";
  import DarkMode from "./ThemeSwitch.svelte";
  import ClockCard from "../../cards/ClockCard.svelte";
</script>

<div class="container mx-auto p-8">
  <div class="flex flex-row flex-nowrap justify-center items-center text-center space-x-4">
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
