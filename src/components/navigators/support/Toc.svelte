<script lang="ts">
  import { revealSidebar } from "../../../services/course/stores";
  import Icon from "../../iconography/Icon.svelte";
</script>

<div class="hidden md:block">
  <button on:click={() => revealSidebar.set(true)}>
    <Icon type="toc" toolTip="course contents" scale="2" />
  </button>
</div>
