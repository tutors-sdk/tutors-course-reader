<script lang="ts">
  import type { Topic } from "../../services/course/topic";
  import Icon from "../iconography/Icon.svelte";

  export let topic: Topic;
</script>

{#each topic.toc as lo}
  <div class="ml-4">
    <a href={lo.route}>
      <Icon type="{lo.type}" scale="1" />
      <span class="ml-1"> {lo.title} </span> </a>
  </div>
  {#if lo.type != 'lab'}
    {#if lo.los}
      <div class="list-disc list-outside">
        {#each lo.los as lo}
          <li class="ml-4">
            <a class="no-underline hover:underline" href={lo.route}>
              <Icon type="{lo.type}" scale="1" /> {lo.title} </a>
            {#if lo.video && lo.type != 'panelvideo'}
              <a class="no-underline hover:underline" href={lo.video}> (
                <Icon type="video" scale="1" />
                ) </a>
            {/if}
          </li>
        {/each}
      </div>
    {/if}
  {/if}
{/each}
