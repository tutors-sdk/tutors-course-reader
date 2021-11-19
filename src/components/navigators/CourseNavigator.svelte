<script lang="ts">
  import type { Course } from "tutors-reader-lib/src/course/course";
  import TopicNavigator from "./TopicNavigator.svelte";

  export let course: Course = null;
</script>

<div class="accordion flex flex-col items-center justify-center">
  {#each course.topics as topic}
    <div class="w-full">
      <input type="checkbox" name="panel" id="{topic.lo.id}" class="hidden">
      <label for="{topic.lo.id}" class="relative block bg-neutral text-neutral-content p-3 border-b border-base-100">{topic.lo.title}</label>
      <div class="accordion__content overflow-hidden bg-grey-lighter px-4">
        <div class="mt-1" />
        <TopicNavigator {topic} />
      </div>
    </div>
  {/each}
</div>

<style>
  label:after {
    content: '+';
    position: absolute;
    right: 1em;
    color: #fff;
  }

  input:checked + label:after {
    content: '-';
    line-height: .8em;
  }

  .accordion__content {
    max-height: 0em;
    transition: all 0.4s cubic-bezier(0.865, 0.14, 0.095, 0.87);
  }

  input[name='panel']:checked ~ .accordion__content {
    /* Get this as close to what height you expect */
    max-height: 50em;
  }
</style>
