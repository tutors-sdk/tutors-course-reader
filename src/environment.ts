let keys = {
  auth0: {
    clientId: "GaRinBEbq5RiS2hwsKe4Tr96vQ4gmHAv",
    domain: "dev-ag-6r7t5.eu.auth0.com",
    redirectUri: "http://localhost:5000",
  },
  firebase: {
    apiKey: "AIzaSyAzoLn7SfXkH58oBRq4dFjLW6DgIpdUf9w",
    databaseURL: "https://tutors-177ed.firebaseio.com",
    projectId: "tutors-177ed",
  },
  ga: "UA-147419187-4",
  theoplayer: "24abfd34-e8c7-48cf-9043-f1b3916b241d",
};

export function getKeys() {
  return keys;
}
