<script>
  function toggle() {
    window.document.body.classList.toggle('dark')
  }
</script>

<button on:click={toggle}>
  <slot/>
</button>

