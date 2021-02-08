import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeJvOLNjdfeAf3iTLJ86TiqZnK-vD_6Bg",
  authDomain: "netflix-clone-c53a6.firebaseapp.com",
  projectId: "netflix-clone-c53a6",
  storageBucket: "netflix-clone-c53a6.appspot.com",
  messagingSenderId: "922855604902",
  appId: "1:922855604902:web:bd03e29ed8c5a172feea67",
  measurementId: "G-MYP5SY8QT0",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, firebaseApp };
export default db;
