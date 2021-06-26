<script lang="ts">
  import { navigatorProps, currentCourse} from "../../../services/course/stores";
  import Breadcrumb from "./Breadcrumb.svelte";
  import Icon from "../../iconography/Icon.svelte";
</script>

<div class="text-s breadcrumbs lg:flex-auto text-neutral-content p-3">
  <ul>
    {#if $currentCourse.lo.properties?.parent != null}
      <li>
        <Icon type="moduleHome" />
        <a href="#/{$currentCourse.lo.properties?.parent}"> &nbsp Programme Home </a>
      </li>
    {/if}
    {#if $navigatorProps.lo.parentLo}
      {#if $navigatorProps.lo.parentLo.parentLo}
        {#if $navigatorProps.lo.parentLo.parentLo.parentLo}
          <Breadcrumb lo={$navigatorProps.lo.parentLo.parentLo.parentLo} />
        {/if}
        <Breadcrumb lo={$navigatorProps.lo.parentLo.parentLo} />
      {/if}
      <Breadcrumb lo={$navigatorProps.lo.parentLo} />
    {/if}
    <Breadcrumb lo={$navigatorProps.lo} />
  </ul>
</div>
