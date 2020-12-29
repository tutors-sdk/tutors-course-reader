<script>
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";

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

<button on:click={toggle} class="tooltip">
  <Icon class="icon-moduleHome" data={getIconFromType('dark')} scale="1.5" />
  <span class='tooltip-text'> Switch visual theme </span>
</button>

