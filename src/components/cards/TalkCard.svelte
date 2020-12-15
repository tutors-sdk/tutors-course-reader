<script lang="ts">
  import type { Lo } from "../../services/course/lo";
  import Icon from "svelte-awesome";
  import { getIconFromType } from "../iconography/icons";
  import { RingLoader } from "svelte-loading-spinners";

  import { onDestroy, tick } from "svelte";
  import pdfjs from "pdfjs-dist";
  import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
  import FileSaver from "file-saver";

  export let url;
  export let scale = 1.8;
  export let pageNum = 1; //must be number

  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  export let lo: Lo = null;
  url = lo.pdf;
  let status = "";

  let canvas;
  let page_num = 0;
  let pageCount = 0;
  let pdfDoc = null;
  let pageRendering = false;
  let pageNumPending = null;
  let rotation = 0;
  let totalPage = 0;
  let interval;
  let secondInterval;

  let pages = [];

  const renderPage = (num) => {
    pageRendering = true;

    pdfDoc.getPage(num).then(function (page) {
      let viewport = page.getViewport({ scale: scale, rotation: rotation });
      const canvasContext = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      let renderContext = {
        canvasContext,
        viewport,
      };
      let renderTask = page.render(renderContext);

      // Wait for rendering to finish
      renderTask.promise.then(function () {
        pageRendering = false;
        if (pageNumPending !== null) {
          // New page rendering is pending
          // renderPage(pageNumPending);
          if (pageNum < pdfDoc.totalPage) {
            pages[pageNum] = canvas;
            pageNum++;
            pdfDoc.getPage(pageNum).then(renderPage);
          } else {
            for (let i = 1; i < pages.length; i++) {
              canvas.appendChild(pages[i]);
            }
          }
          pageNumPending = null;
        }
      });
    });
  };

  const queueRenderPage = (num) => {
    if (pageRendering) {
      pageNumPending = num;
    } else {
      renderPage(num);
    }
  };

  const onPrevPage = () => {
    if (pageNum <= 1) {
      return;
    }
    pageNum--;
    queueRenderPage(pageNum);
  };

  const onNextPage = () => {
    if (pageNum >= pdfDoc.numPages) {
      return;
    }
    pageNum++;
    queueRenderPage(pageNum);
  };

  const clockwiseRotate = () => {
    rotation = rotation + 90;
    queueRenderPage(pageNum);
  };

  const downloadPdf = () => {
    let fileName = url.substring(url.lastIndexOf("/") + 1);
    FileSaver.saveAs(url, fileName);
  };

  const initialLoad = async () => {
    let loadingTask = pdfjs.getDocument({ url });
    loadingTask.promise
      .then(async function (pdfDoc_) {
        pdfDoc = pdfDoc_;
        await tick();
        pageCount = pdfDoc.numPages;
        totalPage = pageCount;
        renderPage(pageNum);
      })
      .catch(function (error) {});
  };
  initialLoad();

  onDestroy(() => {
    clearInterval(interval);
    clearInterval(secondInterval);
  });

  export let showTopicNav = true;
  let close = function () {
    showTopicNav = !showTopicNav;
  };
</script>

<style>
  button {
    border: none;
    background: none;
  }
</style>

<div class="uk-card uk-card-default uk-box-shadow-xlarge uk-animation-fade uk-border-rounded">
  <div class="uk-card-header">
    <div uk-grid>
      <div class="uk-width-expand@m">
        <div class="card-title">{lo.title}</div>
      </div>
      <div><span class="uk-text-large">{status}</span></div>
      <div>
        {#if pdfDoc}
          {pageNum}
          of
          {pdfDoc.numPages}
          <button on:click={onPrevPage} uk-tooltip="title: Previous slide; pos: bottom">
            <Icon class="icon-talk" data={getIconFromType('left')} scale="2" />
          </button>
          <button on:click={onNextPage} uk-tooltip="title: Next slide; pos: bottom">
            <Icon class="icon-talk" data={getIconFromType('right')} scale="2" />
          </button>
          <button on:click={clockwiseRotate} uk-tooltip="title: Rotate; pos: bottom">
            <Icon class="icon-talk" data={getIconFromType('rotate')} scale="2" />
          </button>
          <button on:click={downloadPdf} uk-tooltip="title: Download slides; pos: bottom">
            <Icon class="icon-talk" data={getIconFromType('download')} scale="2" />
          </button>
          <a href={lo.pdf} target="_blank" uk-tooltip="title: Open fullscreen; pos: bottom" class="uk-margin-right">
            <Icon class="icon-talk" data={getIconFromType('fullScreen')} scale="2" />
          </a>
          <button class="uk-button uk-button-default uk-position-top-right uk-padding-small"  uk-tooltip="title:  toggle panel width; pos: bottom"  on:click={close}>
            <Icon class="icon-talk"  data={getIconFromType("expand")} scale="2" />
          </button>
        {:else}loading ...{/if}
      </div>
    </div>
  </div>
  <div class="uk-card-body  uk-padding-remove">
    <style>
      .viewer {
        border-width: 1px;
        border-color: #000;
        border-style: solid;
      }
    </style>{#if pdfDoc}
      <div class="viewer"><canvas bind:this={canvas} width={window.innerWidth} height={window.innerHeight} /></div>
    {:else}
      <div class="uk-card uk-card-default uk-card-body uk-text-center uk-text-baseline uk-height-large uk-border-rounded">
        <div class="uk-position-center">
          <RingLoader size="160" color="#FF3E00" unit="px" />
        </div>
      </div>
    {/if}
  </div>
</div>
