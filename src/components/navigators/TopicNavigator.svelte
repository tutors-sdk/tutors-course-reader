<script lang="ts">
  import type { Topic } from "../../services/course/topic";
  import Icon from "../iconography/Icon.svelte";
  // import Icon from "svelte-hero-icons";
  import { getIcon } from "../iconography/themes";

  export let topic: Topic;
</script>

{#each topic.toc as lo}
  <div>
    <a href={lo.route} class="flex">
      <Icon type="{lo.type}" />
      <span class="ml-1"> {lo.title} </span>
    </a>
  </div>
  {#if lo.type != 'lab'}
    {#if lo.los}
      <div class="list-none list-outside">
        {#each lo.los as lo}
          <li class="ml-2 flex">
            <a class="flex no-underline hover:underline" href={lo.route}>
              <Icon type="{lo.type}"/> <span class="pl-1">{lo.title}</span> </a>
            {#if lo.video && lo.type != 'panelvideo'}
              <a class="flex pl-1 no-underline hover:underline" href={lo.video}>
                <Icon type="video" />
              </a>
            {/if}
          </li>
        {/each}
      </div>
    {/if}
  {/if}
{/each}
