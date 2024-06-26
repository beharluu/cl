// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdZXceZPxLVmKY0H4xYo-zmSCoPwgrKsc",
  authDomain: "meta-support-a827c.firebaseapp.com",
  projectId: "meta-support-a827c",
  storageBucket: "meta-support-a827c.appspot.com",
  messagingSenderId: "854174302605",
  appId: "1:854174302605:web:23c1b9f706b5b5bcbafdc4",
  measurementId: "G-T9M0R839KY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const db = getFirestore();

export { db, app } 
