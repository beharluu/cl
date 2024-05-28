// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKr7RryHkEaEP6N15Qx8EkNVCKMHop-xI",
  authDomain: "fb-creditline.firebaseapp.com",
  projectId: "fb-creditline",
  storageBucket: "fb-creditline.appspot.com",
  messagingSenderId: "970525150898",
  appId: "1:970525150898:web:6d6514e1141583a2fa83ab",
  measurementId: "G-P2ZGQ09Q3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const db = getFirestore();

export { db, app } 
