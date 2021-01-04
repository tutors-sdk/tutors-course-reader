import { isValid } from "../../services/utils/utils-search";

/**
 * Traverses the array of strings and highlights searchTerm
 */
export function highlight_searchTerm(array, searchTerm) {
  if (isValid(searchTerm)) {
    for (let i = 0; i < array.length; i += 1) {
      array[i] = highlight(array[i], searchTerm);
    }
  }
  return array;
}

function highlight(value, searchTerm) {
  let separator = "</a>";
  let indx = value.indexOf(separator);
  let subs0 = value.substring(0, indx + separator.length); // the link (anchor) part of value.
  let subs1 = value
    .substring(indx + separator.length, value.length) // the non link part of value.
    .replace(new RegExp(searchTerm, "gi"), `<b style="background-color:#57D75F;">$&</b>`);
  return subs0 + subs1;
}
