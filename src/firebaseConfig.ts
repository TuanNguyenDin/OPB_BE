// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Wqjdfl3OwLSEikE1DA51vPpK06Ub2UM",
  authDomain: "onlinebookingparty.firebaseapp.com",
  projectId: "onlinebookingparty",
  storageBucket: "onlinebookingparty.appspot.com",
  messagingSenderId: "794751056422",
  appId: "1:794751056422:web:5b72ae85c1ded4af4bc4e7",
  measurementId: "G-FE435EL7LK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);