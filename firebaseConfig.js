// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjZ9j7b1gINS2qsCxKQYRWwTZlEu9tc-w",
  authDomain: "credit-line-db30f.firebaseapp.com",
  projectId: "credit-line-db30f",
  storageBucket: "credit-line-db30f.appspot.com",
  messagingSenderId: "965203453655",
  appId: "1:965203453655:web:5b544a6e1dcac81c6ef292",
  measurementId: "G-ZB9LY0YV4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const db = getFirestore();

export { db, app } 
