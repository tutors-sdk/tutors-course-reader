import path from "path-browserify";
import type { Lo } from "../course/lo";
import Crypto from "crypto-es";

export function injectCourseUrl(lo: Lo, url) {
  if (lo.route) lo.route = lo.route.replace("{{COURSEURL}}", url);
  if (lo.img) lo.img = lo.img.replace("{{COURSEURL}}", url);
  if (lo.video) lo.video = lo.video.replace("{{COURSEURL}}", url);
  if (lo.pdf) lo.pdf = lo.pdf.replace("{{COURSEURL}}", url);
  if (lo.los) {
    lo.los.forEach((lo) => {
      injectCourseUrl(lo, url);
    });
  }
}

function removeLastDirectory(the_url) {
  var the_arr = the_url.split("/");
  the_arr.pop();
  return the_arr.join("/");
}

export function removeLeadingHashes(str: string): string {
  if (str.includes("#")) {
    const i = str.lastIndexOf("#");
    str = str.substr(str.lastIndexOf("#") + 1);
  }
  return str;
}

export function findCourseUrls(labUrl: string): string[] {
  let topicUrl = removeLastDirectory(labUrl);
  if (path.basename(topicUrl).startsWith("unit") && topicUrl.includes("topic")) {
    topicUrl = removeLastDirectory(topicUrl);
  }
  const courseUrl = removeLastDirectory(topicUrl);
  return [courseUrl, topicUrl];
}

export function lastSegment(url: string) {
  var parts = url.split("/");
  var lastSegment = parts.pop() || parts.pop();
  return lastSegment;
}

export function findLos(los: Lo[], lotype: string): Lo[] {
  let result: Lo[] = [];
  los.forEach((lo) => {
    if (lo.type === lotype) {
      result.push(lo);
    }
    if (lo.type == "unit") {
      result = result.concat(findLos(lo.los, lotype));
    }
  });
  return result;
}

export function findVideoLos(los: Lo[]): Lo[] {
  let result: Lo[] = [];
  los.forEach((lo) => {
    if (lo.video) {
      result.push(lo);
    }
    if (lo.type == "unit") {
      result = result.concat(findVideoLos(lo.los));
    }
  });
  return result;
}

export function allLos(lotype: string, los: Lo[]) {
  let allLos: Lo[] = [];
  for (let topic of los) {
    allLos = allLos.concat(findLos(topic.los, lotype));
  }
  return allLos;
}

export function allVideoLos(los: Lo[]) {
  let allLos: Lo[] = [];
  for (let topic of los) {
    allLos = allLos.concat(findVideoLos(topic.los));
  }
  return allLos;
}

export function fixRoutes(lo: Lo) {
  if (lo.route && lo.route[0] == "#") {
    lo.route = lo.route.slice(1);
    lo.route = "/#/" + lo.route;
  }
  if (lo.video && lo.video[0] == "#") {
    lo.video = lo.video.slice(1);
    lo.video = "/#/" + lo.video;
  }
  if (lo.route.endsWith("md") && lo.video) {
    lo.route = lo.video;
  }
}

export function getSortedUnits(los: Lo[]) {
  const allUnits = los.filter((lo) => lo.type == "unit");
  for (let unit of allUnits) {
    const panelVideos = unit.los.filter((lo) => lo.type == "panelvideo");
    const panelTalks = unit.los.filter((lo) => lo.type == "paneltalk");
    const standardLos = unit.los.filter(
      (lo) => lo.type !== "unit" && lo.type !== "panelvideo" && lo.type !== "paneltalk"
    );
    const sortedLos: Lo[] = [];
    sortedLos.push(...panelVideos);
    sortedLos.push(...panelTalks);
    sortedLos.push(...standardLos);
    unit.los = sortedLos;
  }
  return allUnits;
}

var key = Crypto.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
var iv = Crypto.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

export function encrypt(str: string): string {
  const ciphertext = Crypto.AES.encrypt(str, key, { iv: iv });
  const value = ciphertext.toString();
  return value;
}

export function decrypt(str: string): string {
  const raw = Crypto.AES.decrypt(str, key, { iv: iv });
  const value = raw.toString(Crypto.enc.Utf8);
  return value;
}

export function formatDate(date): string {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
