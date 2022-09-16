// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// console.log(process.env); //! funciona en la consola
// console.log(import.meta.env) //! funciona en el navegador

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// Your web app's Firebase configuration
// Dev/Prod
// const firebaseConfig = {
//   apiKey: "AIzaSyD1zY2i9qx6xDTlbW7UvR8vNQqhgSrJNig",
//   authDomain: "curso-react-b9b70.firebaseapp.com",
//   projectId: "curso-react-b9b70",
//   storageBucket: "curso-react-b9b70.appspot.com",
//   messagingSenderId: "989268497041",
//   appId: "1:989268497041:web:1f0a02444931360c09a530"
// };

//Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyDgObPXmXMnvdx6uxI9pdhBzw6qNlgII9Q",
//   authDomain: "curso-react-testing-53669.firebaseapp.com",
//   projectId: "curso-react-testing-53669",
//   storageBucket: "curso-react-testing-53669.appspot.com",
//   messagingSenderId: "599605180503",
//   appId: "1:599605180503:web:53429e76a5930986c24b12"
// };


const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp  = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );
