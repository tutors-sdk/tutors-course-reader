<script lang="ts">
  import { currentCourse, currentLo } from "../../../services/course/stores";
  import Breadcrumb from "./Breadcrumb.svelte";
  import Icon from "../../iconography/Icon.svelte";
</script>

<div class="text-s breadcrumbs flex-auto text-neutral-content p-2">
  <ul>
    {#if $currentCourse.lo.properties?.parent != null}
      <li>
        <a class="btn btn-sm capitalize" href="#/{$currentCourse.lo.properties?.parent}">
        <Icon type="moduleHome" /><span class="hidden md:block md:pl-2"> Programme Home</span> </a>
      </li>
    {/if}
    {#if $currentLo}
      {#if $currentLo.parentLo}
        {#if $currentLo.parentLo.parentLo}
          {#if $currentLo.parentLo.parentLo.parentLo}
            <Breadcrumb lo={$currentLo.parentLo.parentLo.parentLo} />
          {/if}
          <Breadcrumb lo={$currentLo.parentLo.parentLo} />
        {/if}
        <Breadcrumb lo={$currentLo.parentLo} />
      {/if}
      <Breadcrumb lo={$currentLo} />
    {/if}
  </ul>
</div>
