<script lang="ts">
  import { currentCourse, currentLo } from "../../../services/course/stores";
  import Breadcrumb from "./Breadcrumb.svelte";
  import Icon from "../../iconography/Icon.svelte";
</script>

<div class="text-s breadcrumbs flex-auto text-neutral-content p-3">
  <ul>
    {#if $currentCourse.lo.properties?.parent != null}
      <li>
        <Icon type="moduleHome" />
        <a href="#/{$currentCourse.lo.properties?.parent}"> &nbsp Programme Home </a>
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
