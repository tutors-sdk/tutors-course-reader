<script>
  import Icon from "../../iconography/Icon.svelte";

  let themes = [ 'light', 'dark', 'black', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine',
                  'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'luxury', 'dracula' ]

  const htmlTag = document.getElementsByTagName('html')[0]

function applyInitialTheme() {
    const theme = window.localStorage.getItem("site-theme")
    if (theme != null) {
        const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.setAttribute("data-theme", theme)
    } else if (theme === null) {
      const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.setAttribute("data-theme", 'light')
    }
  }

  function setTheme(currentTheme) {
    htmlTag.setAttribute('data-theme', currentTheme)
    window.localStorage.setItem("site-theme", currentTheme)
    console.log("setting theme to ", currentTheme)
  }

applyInitialTheme();

</script>
<div data-tip="Change Visual Theme" class="flex-none tooltip tooltip-bottom dropdown dropdown-end dropdown-hover">
  <button tabindex="0" class="btn btn-square btn-ghost">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  </button>
  <ul class="shadow menu dropdown-content bg-base-100 text-base-content rounded-box w-52">
    {#each themes as theme}
    <li>
      <a on:click={() => setTheme(theme)}>{theme}</a>
    </li> 
    {/each}
  </ul>
</div>
 