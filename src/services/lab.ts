import type { CourseRepo } from "./course-repo";
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

  refreshNav() {
    this.navbarHtml = "";
    let step = "";
    this.lo.los.forEach((chapter, i) => {
      const active = chapter.shortTitle == this.currentChapterShortTitle ? "class= uk-active" : "";
      let title = "";
      title = this.chaptersTitles.get(chapter.shortTitle);
      step = `${i}:`;
      this.navbarHtml = this.navbarHtml.concat(
        `<li ${active}> <a href="/#/lab/${this.url}/${chapter.shortTitle}"> ${step} ${title} </a> </li>`
      );
    });
  }

  async fetchLab(courseRepo: CourseRepo) {
    if (!this.lo) {
      this.lo = await courseRepo.fetchLab(this.url);
      this.objectivesHtml = this.markdownParser.parse(this.lo.los[0].contentMd, this.url);
      this.lo.los.forEach((chapter) => {
        this.chaptersHtml.set(chapter.shortTitle, this.markdownParser.parse(chapter.contentMd, this.url));
        this.chaptersTitles.set(chapter.shortTitle, removeLeadingHashes(chapter.title));
      });
    }
  }

  async fetchPage(courseRepo: CourseRepo, thePath: string) {
    const lastSegment = thePath.substr(thePath.lastIndexOf("/") + 1);
    if (lastSegment.startsWith("book")) {
      this.url = thePath;
      await this.fetchLab(courseRepo);
      this.currentChapterShortTitle = this.lo.los[0].shortTitle;
      this.currentChapterTitle = this.chaptersTitles.get(this.lo.los[0].shortTitle);
      this.content = this.objectivesHtml;
    } else {
      this.url = thePath.substring(0, thePath.lastIndexOf("/"));
      await this.fetchLab(courseRepo);
      this.currentChapterShortTitle = lastSegment;
      this.currentChapterTitle = this.chaptersTitles.get(lastSegment);
      this.content = this.chaptersHtml.get(lastSegment);
    }
    this.refreshNav();
  }
}
