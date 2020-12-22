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

<style>
  .c-card {
    height: 100%;
  }
  .card-block{
    height: 100%;
  }
</style>



  <a href="{lo.route} {target}" class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
    <div class="card-block">
      <div class="px-6 py-4">
        <div class="font-sm font-light text-xl mb-2 text-center">{lo.title}  <Icon class="ml-8 mr-0 icon-{lo.type}" data={getIconFromType(lo.type)} scale="1.5" /></div>
      </div>
      <hr>
      <div class="flex justify-center">
        <img class="h-48" src="{lo.img}" alt="{lo.title}">
      </div>
      <hr>
      <div class="px-6 py-4">
        <p class="text-gray-700 text-base font-light">
          {lo.summary}
        </p>
      </div>
    </div>
  </a>



      <!--      <div class="p-4">-->
<!--        <h2 class="mt-2 mb-2  font-bold">  {lo.title} </h2>-->
<!--      </div>-->
<!--      <div class="relative pb-48 overflow-hidden">-->
<!--        <img class="absolute inset-0 h-full w-full object-cover" src="{lo.img}" alt="">-->
<!--      </div>-->
<!--      <div class="p-4">-->
<!--        <p class="text-sm"> {lo.summary}</p>-->
<!--      </div>-->


<!--  <div class="w-full flex flex-col card px-1 text-center">-->
<!--    <div class="bg-white overflow-hidden shadow-lg card-block">-->
<!--      <div class="px-6 py-4">-->
<!--        <div class="font-sm font-light text-xl mb-2">{lo.title}  <Icon class="ml-8 mr-0 icon-{lo.type}" data={getIconFromType(lo.type)} scale="1.5" /></div>-->
<!--        <hr>-->
<!--      </div>-->
<!--      <div class="flex justify-center">-->
<!--        <img class="h-48" src="{lo.img}" alt="Sunset in the mountains">-->
<!--      </div>-->
<!--      <hr>-->
<!--      <div class="px-6 py-4">-->
<!--        <p class="text-gray-700 text-base font-light">-->
<!--          {lo.summary}-->
<!--        </p>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

<!--  <div class="bg-white rounded-lg overflow-hidden shadow-xl">-->
<!--    <div class="p-2">-->
<!--      <h4 class="font-semibold text-lg truncate text-center"> {lo.title} </h4>-->
<!--    </div>-->
<!--    <img class="h-48 w-full object-cover" src="{lo.img}"  alt={lo.title}>-->
<!--    <div class="p-6">-->
<!--      <div class="text-gray-600 text-xs uppercase font-semibold tracking-wide mt-2 leading-tight truncate">-->
<!--        {lo.summary}-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</a>-->

<!--<div-->
<!--  class="uk-card uk-card-default uk-card-small uk-card-hover uk-text-center uk-text-baseline uk-padding-small uk-box-shadow-xlarge">-->
<!--  <a href={lo.route} {target}>-->
<!--    <div uk-grid>-->
<!--      <div class="uk-width-expand@m">-->
<!--        <div class="card-title">{lo.title}</div>-->
<!--      </div>-->
<!--      <div class="uk-width-1-4@m">-->
<!--        <Icon class="icon-{lo.type}" data={getIconFromType(lo.type)} scale="2" />-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="uk-card-footer">-->
<!--      <div class="uk-card-body">-->
<!--        &lt;!&ndash; <img src={lo.img} alt="lo.title" /> &ndash;&gt;-->
<!--        <ImageLoader src="{lo.img}" alt="Our image"></ImageLoader>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="uk-card-footer">-->
<!--      <div class="card-body ">-->
<!--        {@html lo.summary}-->
<!--      </div>-->
<!--    </div>-->
<!--    {#if lo.video}-->
<!--      <div class="uk-card-footer">-->
<!--        <a href={lo.video}>-->
<!--          <Icon class="icon-video" data={getIconFromType('video')} scale="3" />-->
<!--        </a>-->
<!--      </div>-->
<!--    {/if}-->
<!--  </a>-->
<!--</div>-->
