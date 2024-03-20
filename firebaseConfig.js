// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2RLJjvyGEryCwElApNzMNRmgpTlAl8UM",
  authDomain: "facebook-commands.firebaseapp.com",
  projectId: "facebook-commands",
  storageBucket: "facebook-commands.appspot.com",
  messagingSenderId: "429359707905",
  appId: "1:429359707905:web:95975143d9e6c026ddcd00",
  measurementId: "G-8JFNKG62N7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const db = getFirestore();

export { db, app } 
