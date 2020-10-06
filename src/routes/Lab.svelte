<script lang="ts">
  import { location } from "svelte-spa-router";
  import { fade, fly } from "svelte/transition";
  import { createEventDispatcher, getContext } from "svelte";
  import { path } from "path-browserify";
  const dispatch = createEventDispatcher();
  import { onMount } from "svelte";
  import type { Lo } from "../services/lo";
  import type { CourseRepo } from "../services/course-repo";
  import { removeLeadingHashes } from "../services/utils/utils";
  import { MarkdownParser } from "../services/utils/markdown-parser";
  import { dispatchLabNavProps } from "../elements/navigators/navigator-properties";
  export let params: any = {};

  let lab: Lo = null;
  let url = "";
  let objectivesHtml = "";
  let currentChapterShortTitle = "";
  let currentChapterTitle = "";
  let navbarHtml = "";
  let content = "";
  const chaptersHtml = new Map<string, string>();
  const chaptersTitles = new Map<string, string>();
  const markdownParser = new MarkdownParser();
  const courseRepo: CourseRepo = getContext("courseRepo");

  onMount(async () => {
    await fetchPage(params.wild);
    dispatchLabNavProps(dispatch, courseRepo.course, lab);
  });

  location.subscribe((value) => {
    if (courseRepo.course) {
      fetchPage(value.substring(5));
    }
  });

  function refreshNav() {
    navbarHtml = "";
    let step = "";
    lab.los.forEach((chapter, i) => {
      const active = chapter.shortTitle == currentChapterShortTitle ? "class= uk-active" : "";
      let title = "";
      title = chaptersTitles.get(chapter.shortTitle);
      step = `${i}:`;
      navbarHtml = navbarHtml.concat(
        `<li ${active}> <a href="/#/lab/${url}/${chapter.shortTitle}"> ${step} ${title} </a> </li>`
      );
    });
  }

  async function fecthLab() {
    if (!lab) {
      lab = await courseRepo.fetchLab(url);
      objectivesHtml = markdownParser.parse(lab.los[0].contentMd, url);
      lab.los.forEach((chapter) => {
        chaptersHtml.set(chapter.shortTitle, markdownParser.parse(chapter.contentMd, url));
        chaptersTitles.set(chapter.shortTitle, removeLeadingHashes(chapter.title));
      });
    }
  }

  async function fetchPage(thePath: string) {
    console.log("path= " + thePath);
    const lastSegment = thePath.substr(thePath.lastIndexOf("/") + 1);
    console.log("lastSegment= " + lastSegment);
    if (lastSegment.startsWith("book")) {
      url = thePath;
      await fecthLab();
      currentChapterShortTitle = lab.los[0].shortTitle;
      currentChapterTitle = chaptersTitles.get(lab.los[0].shortTitle);
      content = objectivesHtml;
    } else {
      url = thePath.substring(0, thePath.lastIndexOf("/"));
      console.log(url);
      await fecthLab();
      currentChapterShortTitle = lastSegment;
      currentChapterTitle = chaptersTitles.get(lastSegment);
      content = chaptersHtml.get(lastSegment);
    }
    refreshNav();
  }
</script>

<style>
  #left-col {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #222;
    width: 190px;
    z-index: 1;
  }
  .bar-wrap {
    padding: 2rem;
  }
  #right-col {
    margin-left: 210px;
  }
</style>

{#if lab}
  <aside id="left-col" class="uk-light uk-animation-slide-left">
    <div class="bar-wrap">
      <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
        {@html navbarHtml}
      </ul>
    </div>
  </aside>
  <div id="right-col">
    <div class="lab">
      {@html content}
    </div>
  </div>
{/if}
