<script lang="ts">
  import { currentCourse, currentLo } from "../../../services/course/stores";
  import Breadcrumb from "./Breadcrumb.svelte";
  import Icon from "../../iconography/Icon.svelte";
  import type { Lo } from "../../../services/course/lo";
  
  function crumbs(lo: Lo, los: Lo[]) {
    if (lo) {
      crumbs(lo.parentLo, los);
      los.push(lo);
    }
    return los;
  }
</script>

<div
  class="shadow-lg bg-neutral rounded-box horizontal text-neutral-content text-s breadcrumbs flex-auto p-2 overflow-x-hidden">
  <ul>
    {#if $currentCourse.lo.properties?.parent != null}
      <li>
        <a class="btn btn-sm" href="#/{$currentCourse.lo.properties?.parent}">
          <Icon type="moduleHome" />
        </a>
      </li>
    {/if}
    {#each crumbs($currentLo, []) as lo}
      <Breadcrumb {lo} />
    {/each}
  </ul>
</div>
