import { isValid } from "../utils/utils-search";

export class HighlightValueConverter {
  toView(value) {
    if (isValid(value)) {
      return `<span style="background-color:#e6e9f2; padding:6px">${value}</span>`;
    }
    return value;
  }
}
