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
  horizontalNavbarHtml = "";
  content = "";
  chaptersHtml = new Map<string, string>();
  chaptersTitles = new Map<string, string>();
  steps: string[] = [];

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
    this.steps = Array.from(this.chaptersHtml.keys());
    //this.setActivePage(encodeURI(this.lo.los[0].shortTitle));
    //this.refreshNav();
  }

  refreshNav() {
    let nav = "";
    this.horizontalNavbarHtml = "";

    this.lo.los.forEach((chapter, i) => {
      const active =
        encodeURI(chapter.shortTitle) == this.currentChapterShortTitle
          ? "bg-gray-50 text-gray-900 border rounded-md"
          : "";
      let title = this.chaptersTitles.get(chapter.shortTitle);
      nav = nav.concat(
        `<li class="py-2 text-base font-light ${active}"> <a href="/#/lab/${this.url}/${encodeURI(
          chapter.shortTitle
        )}"> ${title} </a> </li>`
      );

      // horizontal nav
      if (encodeURI(chapter.shortTitle) == this.currentChapterShortTitle) {
        if (this.lo.los[i - 1] !== undefined) {
          let nav = this.lo.los[i - 1];
          let title = this.chaptersTitles.get(nav.shortTitle);
          let step = `${i - 1}:`;
          this.horizontalNavbarHtml = this.horizontalNavbarHtml.concat(
            `<a href="/#/lab/${this.url}/${encodeURI(
              nav.shortTitle
            )}"> <span aria-hidden="true">&larr;</span> ${step} ${title} </a>`
          );
        }
        if (this.lo.los[i + 1] !== undefined) {
          let nav = this.lo.los[i + 1];
          let title = this.chaptersTitles.get(nav.shortTitle);
          let step = `${i + 1}:`;
          this.horizontalNavbarHtml = this.horizontalNavbarHtml.concat(
            `<a class="ml-auto" style="margin-left: auto" href="/#/lab/${this.url}/${encodeURI(
              nav.shortTitle
            )}"> ${step} ${title} <span aria-hidden="true">&rarr;</span></a>`
          );
        }
      }
    });
    this.navbarHtml = nav;
  }

  setFirstPageActive() {
    const startStep = encodeURI(this.lo.los[0].shortTitle);
    this.currentChapterShortTitle = startStep;
    this.currentChapterTitle = this.chaptersTitles.get(startStep);
    this.content = this.chaptersHtml.get(startStep);
    this.refreshNav();
  }

  setActivePage(step: string) {
    if (this.steps.indexOf(step) < 0) return;
    this.currentChapterShortTitle = step;
    this.currentChapterTitle = this.chaptersTitles.get(step);
    this.content = this.chaptersHtml.get(step);
    this.refreshNav();
  }

  nextStep(): string {
    let step = "";
    const itemIndex = this.steps.indexOf(this.currentChapterShortTitle);
    if (itemIndex < this.steps.length - 1) {
      step = this.steps[itemIndex + 1];
    }
    return step;
  }

  prevStep(): string {
    let step = "";
    const itemIndex = this.steps.indexOf(this.currentChapterShortTitle);
    if (itemIndex > 0) {
      step = this.steps[itemIndex - 1];
    }
    return step;
  }
}
