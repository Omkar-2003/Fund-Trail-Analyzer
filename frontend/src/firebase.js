import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb9fe3Bk9N0GCAVj_6G4hfSPs9RQf8LsM",
  authDomain: "login-singup-63ede.firebaseapp.com",
  projectId: "login-singup-63ede",
  storageBucket: "login-singup-63ede.appspot.com",
  messagingSenderId: "1054446818908",
  appId: "1:1054446818908:web:1dc112d7988d2b8b583899",
  measurementId: "G-S0ZL2XTJ4Y",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
