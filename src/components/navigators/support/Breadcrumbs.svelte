<script lang="ts">
  import { currentCourse, currentLo } from "../../../services/course/stores";
  import Breadcrumb from "./Breadcrumb.svelte";
  import Icon from "../../iconography/Icon.svelte";
</script>

<div class="shadow-lg bg-neutral rounded-box horizontal text-neutral-content text-s breadcrumbs flex-auto p-2 overflow-x-hidden">
  <ul>
    {#if $currentCourse.lo.properties?.parent != null}
      <li>
        <a class="btn btn-sm" href="#/{$currentCourse.lo.properties?.parent}">
        <Icon type="moduleHome" /></a>
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
