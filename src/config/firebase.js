// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//auth
import { getAuth } from "firebase/auth";

//should be hidden in .env file
const firebaseConfig = {
  apiKey: "AIzaSyAr_HviO1iTyX9oIgd-cMsh5DfbwxL1fDY",
  authDomain: "zetaton-task1.firebaseapp.com",
  projectId: "zetaton-task1",
  storageBucket: "zetaton-task1.appspot.com",
  messagingSenderId: "176659881943",
  appId: "1:176659881943:web:5132c899e51d0baaa93592",
  measurementId: "G-36VTNRFK5D",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth, firebaseApp };
