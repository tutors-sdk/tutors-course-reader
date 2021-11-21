<script lang="ts">
  import Icon from "../../iconography/Icon.svelte";
  import InfoCard from "./InfoCard.svelte";
  import CalendarCard from "../../cards/CalendarCard.svelte";
</script>

<div data-tip="Module Calendar"
     class="hidden lg:block w-auto h-auto pl-4 pr-4 button button-lg rounded-xl bg-base-100 text-base-content tooltip">
  <label for="title-modal" class="modal-button">
    <div class="text-sm pt-1">Course Info</div>
  </label> <input type="checkbox" id="title-modal" class="modal-toggle">
  <InfoCard />
</div>
