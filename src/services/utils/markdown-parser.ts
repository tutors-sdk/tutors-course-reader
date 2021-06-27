import showdown from "showdown";
import showdownHighlight from "showdown-highlight";
import showdownKatex from "showdown-katex";


let converter = new showdown.Converter({
  tables: true,
  openLinksInNewWindow: true,
  extensions: [showdownHighlight, showdownKatex({
    // maybe you want katex to throwOnError
    throwOnError: false,
    // disable displayMode
    displayMode: false,
    // change errorColor to blue
    errorColor: "red"
  })]
});

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

export class MarkdownParser {
  parse(md: string, url): string {
    let filtered = replaceAll(md, "./img\\/", `img/`);
    filtered = replaceAll(filtered, "img\\/", `https://${url}/img/`);
    filtered = replaceAll(filtered, "./archives\\/", `archives/`);
    filtered = replaceAll(filtered, "archives\\/", `https://${url}/archives/`);
    filtered = replaceAll(filtered, "./archive\\/", `archive/`);
    filtered = replaceAll(filtered, "archive\\/", `https://${url}/archive/`);
    filtered = replaceAll(filtered, "\\]\\(\\#", `](https://${url}#/`);
    let html = converter.makeHtml(filtered);
    return html;
  }
}
