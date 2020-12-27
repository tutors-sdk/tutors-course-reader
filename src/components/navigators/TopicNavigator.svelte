<script lang="ts">
  import type { Topic } from "../../services/course/topic";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  export let topic: Topic;
</script>

{#each topic.toc as lo}
  <div class="ml-4">
    <a href={lo.route}> <Icon class="icon-topic}" data={getIconFromType(lo.type)} /> {lo.title}</a>
  </div>
  {#if lo.type != 'lab'}
    {#if lo.los}
      {#each lo.los as lo}
        <div class="ml-4">
          <a class="ml-4" href={lo.route}> <Icon class="icon-{lo.type}" data={getIconFromType(lo.type)} scale="1" />
            {lo.title}
          </a>
          {#if lo.video && lo.type != 'panelvideo'}
            <a href={lo.video}> <Icon class="icon-video" data={getIconFromType('video')} scale="1" /> </a>
          {/if}
        </div>
      {/each}
    {/if}
  {/if}
{/each}
