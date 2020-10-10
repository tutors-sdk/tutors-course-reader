import * as firebase from "firebase/app";

export function updateCount(key: string) {
  let ref = firebase.database().ref(key);
  ref.transaction(function (count) {
    return (count || 0) + 1;
  });
}

export function updateStr(key: string, str: string) {
  let ref = firebase.database().ref(key);
  ref.transaction(function (value) {
    return str;
  });
}

export function sanatisePath(url: string, path: string) {
  let node = path.replace(url, "");
  node = node.substr(node.indexOf("//") + 2, node.length);
  node = node.replace(/[`#$.\[\]]/gi, "*");
  return node;
}
