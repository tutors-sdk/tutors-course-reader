<script lang="ts">
  import ImageLoader from "../image/ImageLoader.svelte";
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

<a href="{lo.route} {target}" class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
  <div class="card-block">
    <div class="flex flex-row justify-between items-center p-2">
      <div class="font-sm font-light text-xl text-center">{lo.title} </div>
      <Icon class="icon-{lo.type}" data={getIconFromType(lo.type)} scale="1.5" />
    </div>
    <hr>
    <div class="flex justify-center">
      <img class="h-48" src="{lo.img}" alt="{lo.title}">
    </div>
    <hr>
    <div class="px-6 py-4 text-center">
      <p class="text-gray-700 text-base font-light">
        {lo.summary}
      </p>
    </div>
  </div>
</a>
