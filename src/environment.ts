let keys = {
  version: "2.0.0",
  auth0: {
    clientId: "YOUR_KEY",
    domain: "YOUR_KEY",
    redirectUri: "YOUR_KEY",
  },
  firebase: {
    apiKey: "YOUR_KEY",
    databaseURL: "YOUR_KEY",
    projectId: "YOUR_KEY",
  },
  ga: "YOUR_KEY",
  theoplayer: "YOUR_KEY",
};

export function getKeys() {
  return keys;
}
