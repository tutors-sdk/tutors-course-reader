import type { Lo } from "../lo";

export interface Row {
  one: Lo;
  two: Lo;
  three: Lo;
  four: Lo;
}

export function chunk(array, size) {
  const chunked_arr = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1];
    if (!last || last.length === size) {
      chunked_arr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunked_arr;
}

export function generateRows(los: Lo[]): Row[] {
  let chunkedLos: Lo[];
  let loRows: Row[] = [];
  chunkedLos = chunk(los, 4);
  chunkedLos.forEach((los) => {
    loRows.push({ one: los[0], two: los[1], three: los[2], four: los[3] });
  });
  return loRows;
}
