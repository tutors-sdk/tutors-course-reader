export class SearchBoldValueConverter {
  toView(value, searchTerm) {
    let separator = "</a>";
    let indx = value.indexOf(separator);
    let subs0 = value.substring(0, indx + separator.length); // the link (anchor) part of value.
    let subs1 = value
      .substring(indx + separator.length, value.length) // the non link part of value.
      .replace(new RegExp(searchTerm, "gi"), `<b style="background-color:#57D75F;">$&</b>`);
    return subs0 + subs1;
  }
}
