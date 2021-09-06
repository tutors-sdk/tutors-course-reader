<script>
  import Icon from "../../iconography/Icon.svelte";
  //import { getIcon } from "../../iconography/icon-lib";
  // import Icon from "svelte-hero-icons";
  let themes = ["tutors", "tutors-dark", "black", "lofi", "pastel", "cyberpunk", "dracula"];

  const htmlTag = document.getElementsByTagName("html")[0];

  function applyInitialTheme() {
    const theme = window.localStorage.getItem("site-theme");
    if (theme != null) {
      const htmlTag = document.getElementsByTagName("html")[0];
      htmlTag.setAttribute("data-theme", theme);
    } else if (theme === null) {
      const htmlTag = document.getElementsByTagName("html")[0];
      htmlTag.setAttribute("data-theme", "tutors");
    }
  }

  function setTheme(currentTheme) {
    htmlTag.setAttribute("data-theme", currentTheme);
    window.localStorage.setItem("site-theme", currentTheme);
    console.log("setting theme to ", currentTheme);
  }

  applyInitialTheme();

</script>
<div class="flex-none tooltip tooltip-top dropdown dropdown-end dropdown-hover">
    <Icon type="dark" toolTip="Change Visual Theme" button="true"/>
  <ul class="shadow menu dropdown-content bg-base-100 text-base-content w-52 p-1 rounded-lg">
    {#each themes as theme}
      <button on:click={() => setTheme(theme)} class="bg-base-100 text-base-content py-2" data-theme="{theme}">{theme}</button>
    {/each}
  </ul>
</div>
