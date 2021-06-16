<script lang="ts">
  import { revealSidebar } from "../../../services/course/stores";
  import Icon from "../../iconography/Icon.svelte";
</script>

<div data-tip="Course Contents" class="hidden md:block tooltip tooltip-bottom">
  <button on:click={() => revealSidebar.set(true)}>
    <Icon type="toc" scale="2" />
  </button>
</div>
