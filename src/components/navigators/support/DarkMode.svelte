<script>
  import Icon from "../../iconography/Icon.svelte";

  function toggle() {
    const htmlTag = document.getElementsByTagName('html')[0]
    if (htmlTag.hasAttribute('data-theme')) {
      var currentTheme = htmlTag.getAttribute('data-theme');
        if (currentTheme === 'dark') {
          htmlTag.setAttribute('data-theme', 'light')
          window.localStorage.setItem("site-theme", "light")
        } else if (currentTheme === 'light') {
          htmlTag.setAttribute('data-theme', 'dark')
          window.localStorage.setItem("site-theme", "dark")
        }
    }
}

function applyInitialTheme() {
    const theme = window.localStorage.getItem("site-theme")
    if (theme !== null) {
        const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.setAttribute("data-theme", theme)
    } else if (theme === null) {
      const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.setAttribute("data-theme", 'light')
    }
}

applyInitialTheme();

</script>
<div data-tip="Change Visual Theme" class="flex-none tooltip tooltip-bottom">
  <button on:click={toggle} class="btn btn-square btn-ghost">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  </button>
</div>
 