
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGJ2FtFcNOnAAv8dBoYBTxFOvqF556D20",
  authDomain: "reactapp-4f5d7.firebaseapp.com",
  projectId: "reactapp-4f5d7",
  storageBucket: "reactapp-4f5d7.appspot.com",
  messagingSenderId: "150845453287",
  appId: "1:150845453287:web:d798c4da402d42f12ec342"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);