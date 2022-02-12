import type { Lo } from "../reader-lib/course/lo";
import removeMd from "remove-markdown";

const extraChars: number = 80;
const maxNumberHits: number = 100;

/**
 * Searches an array of nested Lo arrays for presence of searchTerm.
 * When a string containing the searchTerm is found it is converted to text.
 * It is augmented to a length obtained by adding extraChars number characters,
 * which is an environment variable, to the length of the searchTerm.
 * On 31.10.19 resolved the issue whereby only first instance of a searchTerm on any
 * web page returned. Now all instances of the search term identified.
 * @param los The nested arrays of Lo objects.
 * @param searchTerm The term whose presence is searched for.
 */
export function searchHits(los: Lo[], searchTerm: string): string[] {
  let flatLos = flattenNestedLosArrays(los);
  let result: string[] = [];
  flatLos.forEach((obj) => {
    let text = removeMd(obj.lab.contentMd);
    let contents = augmentedSubstrings(text, searchTerm, extraChars);
    for (let content of contents) {
      result.push(`<a href="${obj.lab.route}">${obj.topicTitle}${obj.lab.title} ${obj.lab.shortTitle}</a>  ${content}`);
    }
  });
  return result.slice(0, maxNumberHits);
}

/*
 * Extract and return the path from parameter 'astring'.
 * astring format: -<a href = #path"> Simple </a>
 *                  <a href="${obj.lab.route}"> ...
 *
 * Modify 'astring' by inserting / following #.
 * For example, replace this: "#lab/... with: "#/lab..."
 *
 * @param astring String to parse for path (route).
 * @return The path
 */
export function extractPath(astring: string) {
  let regex = /#/;
  astring = astring.replace(regex, "#/");
  let start = astring.indexOf("#");
  let end = astring.indexOf(">") - 1; // exclude preceeding double quote.
  return astring.substring(start, end);
}

/**
 * Given the route, discover and return a reference to the parent Lo object.
 * @param route
 */
export function findLo(route: string, los: Lo[]): Lo {
  let flatLos = flattenNestedLosArrays(los);
  let lo: Lo;
  flatLos.forEach((obj) => {
    if (obj.lab.route === route) {
      lo = obj.lab;
    }
  });
  return lo;
}

function flattenNestedLosArrays(los: Lo[]) {
  return flatten(los, "");
}

function flatten(arr: Lo[], topicTitle: string, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value.los)) {
      flatten(value.los, arr[i].parent.lo.title, result);
    } else {
      result.push({ lab: value, topicTitle: topicTitle });
    }
  }
  return result;
}

/**
 * Validate a string: is valid if it is not undefined and
 * does not comprise only whitespace else it is invalid.
 * @param str A string being validated.
 * @returns true if valid else false.
 */
export function isValid(str: string) {
  return str != undefined && /\S/.test(str) == true;
}

/**
 * Returns an array of substrings of targetString comprising searchTerm and
 * extraChars number characters on either side of searchTerm.
 * That is, the total length of each substring is the sum of the
 * lengths of the search term + twice extra chars. However in the edge conditions
 * namely at the beginning and end of the target string, any necessary adjustment is
 * made to substrings that might be present here or near here.
 *
 * Example:  targetString  = 'syeasy and hard synchronized syncsy';
 * searchTerm = 'sy';
 * extraChars = 4;
 * arStrings: ["syeasy", "syeasy and", "ard synchr", "zed syncsy", "syncsy"]
 *
 * @param targetString The string within which one or more searchTerm substrings exist.
 * @param searchTerm The substring, at lease one instance of which exists.
 * @param extraChars The number of additional characters to be added each end of searchTerm, edge conditions allowing.
 * @return arStrings An array of augmented substrings.
 */
function augmentedSubstrings(targetString: string, searchTerm: string, extraChars: number) {
  let arStrings = []; // The output: the set of discovered and augmented substrings.
  let arIndx = indicesOf(targetString, searchTerm);
  for (let i = 0; i < arIndx.length; i += 1) {
    let index = arIndx[i];
    let startIndex = index - extraChars > 0 ? index - extraChars : 0;
    let endIndex =
      index + searchTerm.length + extraChars <= targetString.length ? index + searchTerm.length + extraChars : targetString.length;
    let str = targetString.slice(startIndex, endIndex);
    arStrings.push(str);
  }
  return arStrings;
}

/**
 * This method , indicesOf, uses the Javascript indexOf method.
 * indexOf is invoked recursively to locate the start indices of an optionally recurring substring within a string.
 * The method is valid even if the specified substring is empty.
 * Since indexOf is case sensitive then it follows that indicesOf is case sensitive.
 *  Example: str = syeasy and hard synchronized syncsy'
 *  Substring: 'sy'
 *  Output: [0, 4, 16, 29, 33]
 * @author: jfitzgerald
 * @param str The target or specified string within which the first indices of each substring is sought.
 * @param substr The substring(s) whose indices are being determined.
 * @param arIndex An array of substring start indices.
 * @return arIndx An array of the indices of positions of first character of each substring. If no mon-empty substring is
 *         present then arIndx will be empty.
 */
function indicesOf(str: string, substr: string): number[] {
  let arIndx: number[] = [];

  function indicesOf(str: string, substr: string, arIndx: number[]): number[] {
    let n = str.indexOf(substr);
    if (n != -1) {
      let prev_n = n;
      if (arIndx.length) {
        n += arIndx[arIndx.length - 1] + substr.length;
      }
      arIndx.push(n);
      indicesOf(str.slice(prev_n + substr.length), substr, arIndx);
    } else {
      return;
    }
  }

  indicesOf(str, substr, arIndx);
  return arIndx;
}

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
