<script>
  import Icon from "../../iconography/Icon.svelte";

  function toggle() {
    const htmlTag = document.getElementsByTagName('html')[0]
    if (htmlTag.hasAttribute('data-theme')) {
      var currentTheme = htmlTag.getAttribute('data-theme');
        if (currentTheme === 'black') {
          htmlTag.setAttribute('data-theme', 'light')
          window.localStorage.setItem("site-theme", "light")
        } else if (currentTheme === 'light') {
          htmlTag.setAttribute('data-theme', 'black')
          window.localStorage.setItem("site-theme", "black")
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

<div data-tip="Switch Visual Theme" class="tooltip tooltip-bottom">
<button on:click={toggle} class="btn btn-link">
  <Icon type="dark" scale="1.5" />
</button>
</div>
 