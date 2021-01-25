<script lang="ts">
  import { profile, studentsOnline } from "../../../services/course/stores";
  import Icon from "../../iconography/Icon.svelte";

  let nav = $profile;

  profile.subscribe(navBar => {
    nav = navBar;
  })
</script>

{#if $profile.show}
  <div class="px-1 bg-white border rounded shadow flex justify-center items-center dark:bg-black dark:text-white">
    {#each nav.bar as i}
      <div class="px-1 py-2">
        <Icon type="{i.icon}" link="{i.link}" target="{i.target}" toolTip="{i.tip}" scale="1.5" />
      </div>
    {/each}
<!--    <div class="border rounded font-sm p-1  w-8 text-l text-center tooltip">-->
<!--      <span class="tooltip-text"> Number of Students online now </span>-->
<!--      {$studentsOnline}-->
<!--    </div>-->
  </div>
{/if}

