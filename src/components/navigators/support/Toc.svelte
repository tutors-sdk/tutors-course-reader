<script lang="ts">
  import { revealSidebar } from "../../../services/course/stores";
  import Icon from "../../iconography/Icon.svelte";
</script>

<button on:click={() => revealSidebar.set(true)} class="btn btn-square btn-ghost">
  <Icon type="toc" toolTip="View Course Contents" />
</button>
