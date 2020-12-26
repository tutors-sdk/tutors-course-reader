import type { Lo } from "./lo";
import { MarkdownParser } from "../utils/markdown-parser";
import { removeLeadingHashes } from "../utils/utils";

export class Lab {
  lo: Lo = null;
  url = "";
  objectivesHtml = "";
  currentChapterShortTitle = "";
  currentChapterTitle = "";
  navbarHtml = "";
  content = "";
  chaptersHtml = new Map<string, string>();
  chaptersTitles = new Map<string, string>();
  markdownParser = new MarkdownParser();
  vertical = true;

  constructor(lo: Lo, url: string) {
    this.url = url;
    this.lo = lo;
    this.objectivesHtml = this.markdownParser.parse(this.lo.los[0].contentMd, this.url);
    this.lo.los.forEach((chapter) => {
      this.chaptersHtml.set(encodeURI(chapter.shortTitle), this.markdownParser.parse(chapter.contentMd, this.url));
      this.chaptersTitles.set(chapter.shortTitle, removeLeadingHashes(chapter.title));
    });
    this.setActivePage(encodeURI(this.lo.los[0].shortTitle));
    this.refreshNav();
  }

  refreshNav() {
    this.navbarHtml = "";
    let step = "";
    this.lo.los.forEach((chapter, i) => {
      const active = encodeURI(chapter.shortTitle) == this.currentChapterShortTitle ? 'class="bg-gray-50 text-gray-900"' : "";
      let title = "";
      if (this.vertical) {
        title = this.chaptersTitles.get(chapter.shortTitle);
      } else {
        title = chapter.shortTitle;
      }
      if (this.vertical) {
        step = `${i}:`;
      }
      this.navbarHtml = this.navbarHtml.concat(
        `<div ${active}> <a href="/#/lab/${this.url}/${encodeURI(chapter.shortTitle)}"> ${step} ${title} </a> </div>`
      );
    });
  }

  setActivePage(step: string) {
    this.currentChapterShortTitle = step;
    this.currentChapterTitle = this.chaptersTitles.get(step);
    this.content = this.chaptersHtml.get(step);
    this.refreshNav();
  }
}
