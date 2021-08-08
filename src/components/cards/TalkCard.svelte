<script lang="js">
  import Icon from "../iconography/Icon.svelte";
  import { RingLoader, Clock } from "svelte-loading-spinners";
  import FileSaver from "file-saver";
  import { onDestroy, tick } from "svelte";

  import * as pdfjs from 'pdfjs-dist/build/pdf.js'
  import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

  export let url;
  export let scale = 1.8;
  export let pageNum = 1; //must be number
  export let lo = null;

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

    pdfDoc.getPage(num).then(function(page) {
      let viewport = page.getViewport({ scale: scale, rotation: rotation });
      const canvasContext = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      let renderContext = {
        canvasContext,
        viewport
      };
      let renderTask = page.render(renderContext);

      // Wait for rendering to finish
      renderTask.promise.then(function() {
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
    window.addEventListener("keydown", keypressInput);
    let loadingTask = pdfjs.getDocument({ url });
    loadingTask.promise
      .then(async function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        await tick();
        pageCount = pdfDoc.numPages;
        totalPage = pageCount;
        renderPage(pageNum);
      })
      .catch(function(error) {
      });
  };
  initialLoad();

  onDestroy(() => {
    clearInterval(interval);
    clearInterval(secondInterval);
    window.removeEventListener("keypress", keypressInput);
  });

  function keypressInput(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onNextPage();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPrevPage();
    }
  }

</script>


{#if pdfDoc}
  <div class="border shadow-xl rounded-lg overflow-hidden bg-base-100">
    <div class="flex justify-between items-center mx-2">
      <div class="text-sm">
        {pageNum} of {pdfDoc.numPages}
      </div>
      <div>
        <div data-tip="Previous Slide" class="flex-none tooltip tooltip-bottom">
          <button on:click={onPrevPage} class="px-1 py-2">
            <Icon type="left" />
          </button>
        </div>
        <div data-tip="Next Slide" class="flex-none tooltip tooltip-bottom">
          <button on:click={onNextPage} class="px-1 py-2">
            <Icon type="right" />
          </button>
        </div>
        <div data-tip="Rotate 90 Degrees" class="flex-none tooltip tooltip-bottom">
          <button on:click={clockwiseRotate} class="px-1 py-2">
            <Icon type="rotate" />
          </button>
        </div>
        <div data-tip="Download" class="flex-none tooltip tooltip-bottom">
          <button on:click={downloadPdf} class="px-1 py-2">
            <Icon type="download" />
          </button>
        </div>

        <div data-tip="Full Screen" class="flex-none tooltip tooltip-bottom">
        <span class="px-1 py-2 text-success">
          <Icon link={lo.pdf} type="fullScreen" target="_blank" />
        </span>
        </div>
      </div>
    </div>
    <canvas class="w-full" bind:this={canvas} />
  </div>
{:else}
  <div class="flex flex-col justify-center items-center mt-28">
    <Clock size="280" color="#FF3E00" unit="px"/>
  </div>
{/if}
