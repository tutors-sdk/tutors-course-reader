<script>
  import Icon from "../../iconography/Icon.svelte";
  import {themes, setTheme} from "../../iconography/themes";
</script>

<div class="flex-none tooltip tooltip-top dropdown dropdown-end dropdown-hover">
  <Icon type="dark" toolTip="Change Visual Theme" button="true" />
  <ul class="shadow menu dropdown-content bg-base-100 text-base-content w-52 p-1 rounded-lg">
    {#each themes as theme}
      <button on:click={() => setTheme(theme)} class="bg-base-100 text-base-content py-2"
              data-theme="{theme}">{theme}</button>
    {/each}
  </ul>
</div>
