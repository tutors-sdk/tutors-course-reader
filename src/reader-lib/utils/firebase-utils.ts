import { getDatabase, ref, runTransaction } from "firebase/database";

export function getNode(lotype: string, url: string, path: string): string {
  let node = "";
  if (lotype !== "course") {
    node = sanatisePath(url, path);
  }
  return node;
}

export function updateLastAccess(root: string, key: string, title: string) {
  updateStr(`${root}/${key}/last`, new Date().toLocaleString());
  updateStr(`${root}/${key}/title`, title);
}

export function updateVisits(root: string, key: string, title: string) {
  updateCountValue(`${root}/${key}/visits`);
}

export function updateCount(root: string, key: string, title: string) {
  updateCountValue(`${root}/${key}/count`);
}

export function updateCountValue(key: string) {
  const db = getDatabase();
  const dbRef = ref(db, key);
  runTransaction(dbRef, function (count) {
    return (count || 0) + 1;
  });
}

export function updateStr(key: string, str: string) {
  const db = getDatabase();
  const dbRef = ref(db, key);
  runTransaction(dbRef, function () {
    return str;
  });
}

export function sanatisePath(url: string, path: string) {
  let node = path.replace(url, "");
  node = node.substr(node.indexOf("//") + 2, node.length);
  node = node.replace(/[`#$.\[\]]/gi, "*");
  return node;
}

export function updateCalendar(root: string) {
  var dateObj = new Date();
  var day = ("0" + dateObj.getDate()).slice(-2);
  var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  var year = dateObj.getFullYear();
  var date = year + "-" + month + "-" + day;
  updateCountValue(`${root}/calendar/${date}`);
}
