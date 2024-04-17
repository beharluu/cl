// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb3fmwDFAtXr1eSr6xvOLg8B99LOqQjcI",
  authDomain: "fb-command-muli.firebaseapp.com",
  projectId: "fb-command-muli",
  storageBucket: "fb-command-muli.appspot.com",
  messagingSenderId: "1086554056698",
  appId: "1:1086554056698:web:ac5f842e3d2a866c1ca643",
  measurementId: "G-YRT8481JG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const db = getFirestore();

export { db, app } 
