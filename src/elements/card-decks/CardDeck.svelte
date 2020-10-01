<script lang="ts">
  import CardRow from "../cards/CardRow.svelte";
  import { generateRows } from "../../services/utils/card-utils";
  import type { Lo } from "../../services/lo";
  export let los: Lo[] = [];
  let loRows = generateRows(los);
</script>

<div>
  <CardRow {los} />
  <hr class="uk-divider" />
</div>
