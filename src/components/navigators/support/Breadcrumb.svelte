<script lang="ts">
  import Icon from "../../iconography/Icon.svelte";
  import type { Lo } from "../../../services/course/lo";

  export let lo:Lo;
</script>

<li>
  <Icon type="{lo.type}" />
  <a href="{lo.route}"> &nbsp {lo.title}</a>
</li>
