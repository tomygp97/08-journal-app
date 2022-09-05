// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1zY2i9qx6xDTlbW7UvR8vNQqhgSrJNig",
  authDomain: "curso-react-b9b70.firebaseapp.com",
  projectId: "curso-react-b9b70",
  storageBucket: "curso-react-b9b70.appspot.com",
  messagingSenderId: "989268497041",
  appId: "1:989268497041:web:1f0a02444931360c09a530"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );
