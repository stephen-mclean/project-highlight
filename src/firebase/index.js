import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID
});

export const authRef = firebase.auth();
export const authVarRef = firebase.auth;
export const dbRef = firebase.firestore();
export const booksRef = dbRef.collection("books");
export const entriesRef = dbRef.collection("entries");

export const uploadFile = file => {
  const storage = firebase.storage().ref();
  return new Promise(resolve => {
    const currentUser = authRef.currentUser;
    const fileStorageRef = storage.child(`${currentUser.uid}/${file.name}`);

    fileStorageRef.put(file).then(() => {
      fileStorageRef.getDownloadURL().then(url => {
        resolve(url);
      });
    });
  });
};
