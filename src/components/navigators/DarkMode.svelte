<script>
  if (!localStorage.theme) {
    localStorage.theme = "light"
  }

  function toggle() {
    window.document.body.classList.toggle('dark')
    if (localStorage.theme === "light") {
      localStorage.theme = "dark"
    } else {
      localStorage.theme = "light"
    }
  }
</script>

<button on:click={toggle}>
  <slot/>
</button>

