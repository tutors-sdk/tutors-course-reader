<script lang="ts">
  import UnitCard from "../cards/UnitCard.svelte";
  import type { Lo } from "../../services/lo";
  export let units: Lo[] = [];
</script>

{#each units as unit}
  <UnitCard {unit} />
{/each}
