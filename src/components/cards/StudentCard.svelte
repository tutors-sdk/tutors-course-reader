<script lang="ts">
  import type { StudentMetric } from "../../reader-lib/types/metrics-types";
  import Image from "./Image.svelte";
  import { getIcon } from "../iconography/themes";
  import { cardTransition } from "../animations";
  import Iconify from "@iconify/svelte";

  export let student: StudentMetric;

  let headingText = "text-xs font-medium";
  let text = "text-xs";
  let cardWidths = "w-40 h-56";
  let cardType = "tutorscard-compact"
  let cardHeader ="tutorscard-header-compact"
  let iconHeight = "90";
  let imageHeight = "h-20";
</script>

<style>
  .card {
    max-width: 200px;
    min-width: 200px;
    height: auto
  }
</style>

<div transition:cardTransition class="{cardType} {cardWidths} border-{getIcon('talk').colour}">
  <div class="text-center p-1 {headingText}"> {student.name} </div>
  <hr>
  <div class="grid grid-cols-2 gap-1">
    <div>
      <img loading="lazy" class="object-scale-down" src="{student.img}" alt="{student.nickname}">
    </div>
    <div>
      {#if student.topic.lo.icon}
        <Iconify icon="{student.topic.icon.type}" color="{student.topic.icon.color}" height="{iconHeight}"></Iconify>
      {:else}
        <img loading="lazy" class="tutorscard-image {imageHeight}" src="{student.topic.lo.img}" alt="{student.topic.lo.title}">
      {/if}
    </div>
    <div>
      {#if student.lab }
        {#if student.lab.icon}
          <Iconify icon="{student.lab.icon.type}" color="{student.lab.icon.color}" height="{iconHeight}"></Iconify>
        {:else}
          <img loading="lazy" class="tutorscard-image {imageHeight}" src="{student.lab.img}" alt="{student.lab.title}">
        {/if}
      {/if}
    </div>
    <div class="text-xs text-center tutorscard-body">
      <div class="italic mt-2">
        {new Date(student.time).toLocaleTimeString()}
      </div>
      <hr>
      <div class="mt-2">
        {#if student.topic }
          <div><span class="italic"> </span>{student.topic.lo.title}</div>
        {/if}
        {#if student.lab }
          <div><span class="italic"> </span>{student.lab.title}</div>
        {/if}
      </div>
    </div>
  </div>
</div>
