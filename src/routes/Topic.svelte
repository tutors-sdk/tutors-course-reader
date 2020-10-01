<script lang="ts">
  import { onMount, getContext } from "svelte";
  import type { Course } from "../services/course";
  import type { Topic } from "../services/topic";
  export let params: any = {};

  let repo: any = getContext("courseRepo");
  let courseRepo = repo.repo;
  let topic: Topic = null;
  onMount(async () => {
    topic = await courseRepo.fetchTopic(params.wild);
  });
</script>

<h1>Topic</h1>
{#if topic}
  <h1>{topic.lo.title}</h1>
{/if}
