<script lang="ts">
  import ImageLoader from "../image/ImageLoader.svelte";
  import { fade, fly } from "svelte/transition";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import type { Lo } from "../../services/course/lo";
  export let lo: Lo;
  let target = "";
  if (lo.type === "web") {
    if (lo.route.startsWith("http")) {
      target = "_blank";
    }
  }
</script>

<style>
  .card {
    max-width: 250px;
    height: auto
  }
</style>

<a href="{lo.route} {target}" class="card m-4 block bg-white border shadow-md hover:shadow-xl dark:hover:bg-white rounded-lg overflow-hidden dark:bg-black dark:text-white" in:fade={{ duration: 800 }}>
  <div class="flex flex-row justify-between items-center p-2">
    <div class="font-sm font-light text-xl text-center">{lo.title} </div>
    <Icon class="icon-{lo.type}" data={getIconFromType(lo.type)} scale="1.5" />
  </div>
  <hr>
  <div class="flex justify-center">
    <img loading="lazy" class="object-scale-down p-1 h-48" src="{lo.img}" alt="{lo.title}">
  </div>
  <hr>
  <div class="px-6 py-4 text-center">
    <p class="text-base font-light">
      {@html lo.summary}
    </p>
  </div>
</a>
