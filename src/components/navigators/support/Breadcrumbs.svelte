<script lang="ts">
  import { navigatorProps } from "../../../services/course/stores";
  import Breadcrumb from "./Breadcrumb.svelte";
</script>

<div class="text-s breadcrumbs lg:flex-auto text-neutral-content p-3">
  <ul>
    {#if $navigatorProps.lo.parentLo}
      {#if $navigatorProps.lo.parentLo.parentLo}
        {#if $navigatorProps.lo.parentLo.parentLo.parentLo}
          <Breadcrumb lo={$navigatorProps.lo.parentLo.parentLo.parentLo}/>
        {/if}
        <Breadcrumb lo={$navigatorProps.lo.parentLo.parentLo}/>
      {/if}
      <Breadcrumb lo={$navigatorProps.lo.parentLo}/>
    {/if}
    <Breadcrumb lo={$navigatorProps.lo}/>
  </ul>
</div>
