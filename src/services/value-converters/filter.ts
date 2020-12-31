import { isValid } from "../utils/utils-search";

export function filter(array, searchTerm) {
  if (isValid(searchTerm)) {
    return array.filter((item) => {
      return searchTerm && searchTerm.length > 0 ? this.itemMatches(searchTerm, item) : true;
    });
  }
}

function itemMatches(searchTerm, value) {
  let itemValue = value;
  if (!itemValue) return false;
  return itemValue.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1;
}
