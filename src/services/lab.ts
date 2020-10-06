import type { Lo } from "./lo";
import { MarkdownParser } from "./utils/markdown-parser";
import { removeLeadingHashes } from "./utils/utils";

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

  constructor(lo: Lo, url: string) {
    this.url = url;
    this.lo = lo;
    this.objectivesHtml = this.markdownParser.parse(this.lo.los[0].contentMd, this.url);
    this.lo.los.forEach((chapter) => {
      this.chaptersHtml.set(encodeURI(chapter.shortTitle), this.markdownParser.parse(chapter.contentMd, this.url));
      this.chaptersTitles.set(chapter.shortTitle, removeLeadingHashes(chapter.title));
    });
    //this.currentChapterShortTitle = this.lo.los[0].shortTitle;
    //this.currentChapterTitle = this.lo.los[0].title;
    // this.content = this.lo.los[0].contentMd;
    this.setActivePage(encodeURI(this.lo.los[0].shortTitle));
    this.refreshNav();
  }

  refreshNav() {
    this.navbarHtml = "";
    let step = "";
    this.lo.los.forEach((chapter, i) => {
      const active = encodeURI(chapter.shortTitle) == this.currentChapterShortTitle ? "class= uk-active" : "";
      let title = "";
      title = this.chaptersTitles.get(chapter.shortTitle);
      step = `${i}:`;
      this.navbarHtml = this.navbarHtml.concat(
        `<li ${active}> <a href="/#/lab/${this.url}/${chapter.shortTitle}"> ${step} ${title} </a> </li>`
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
