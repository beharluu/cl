// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsPRQPxIPmLiPC6uqc0AYdIP5xPnYY9-w",
  authDomain: "facebook-634ce.firebaseapp.com",
  projectId: "facebook-634ce",
  storageBucket: "facebook-634ce.appspot.com",
  messagingSenderId: "372116656374",
  appId: "1:372116656374:web:d78c5656b8cac4e3e61cd7",
  measurementId: "G-X55TJV68PS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const db = getFirestore();

export { db, app } 