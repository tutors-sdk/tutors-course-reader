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
    let nav = ""
    this.lo.los.forEach((chapter, i) => {
      const active = encodeURI(chapter.shortTitle) == this.currentChapterShortTitle ? "bg-gray-50 text-gray-900 border rounded-md" : "";
      let title = this.chaptersTitles.get(chapter.shortTitle);
      nav = nav.concat(
          `<li class="py-2 text-base font-light ${active}"> <a href="/#/lab/${this.url}/${encodeURI(chapter.shortTitle)}"> ${title} </a> </li>`
      );
    });
    this.navbarHtml = nav;
  }

  setActivePage(step: string) {
    this.currentChapterShortTitle = step;
    this.currentChapterTitle = this.chaptersTitles.get(step);
    if (step === this.lo.id) {
      this.content = this.chaptersHtml.get(encodeURI(this.lo.los[0].shortTitle));
    } else {
      this.content = this.chaptersHtml.get(step);
    }
    this.refreshNav();
  }
}
