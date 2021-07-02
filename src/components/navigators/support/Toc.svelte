<script lang="ts">
  import { revealSidebar } from "../../../services/course/stores";
  import Icon from "../../iconography/Icon.svelte";
</script>

<a on:click={() => revealSidebar.set(true)}>
  <Icon type="toc" toolTip="View Course Contents" button="true"/>
</a>
