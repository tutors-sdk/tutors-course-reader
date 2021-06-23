<script>
  import Icon from "../../iconography/Icon.svelte";

  let themes = [ 'tutors', 'light', 'dark', 'black', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'lofi', 'pastel', 'dracula', 'wireframe' ]

  const htmlTag = document.getElementsByTagName('html')[0]

function applyInitialTheme() {
    const theme = window.localStorage.getItem("site-theme")
    if (theme != null) {
        const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.setAttribute("data-theme", theme)
    } else if (theme === null) {
      const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.setAttribute("data-theme", 'tutors')
    }
  }

  function setTheme(currentTheme) {
    htmlTag.setAttribute('data-theme', currentTheme)
    window.localStorage.setItem("site-theme", currentTheme)
    console.log("setting theme to ", currentTheme)
  }

applyInitialTheme();

</script>
<div data-tip="Change Visual Theme" class="flex-none tooltip tooltip-top dropdown dropdown-end dropdown-hover">
  <button tabindex="0" class="btn btn-square btn-ghost">
    <Icon type="dark" />
  </button>
  <ul class="shadow menu dropdown-content bg-base-100 text-base-content rounded-box w-52">
    {#each themes as theme}
    <li>
      <a on:click={() => setTheme(theme)}>{theme}</a>
    </li> 
    {/each}
  </ul>
</div>
 