import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth" ;
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAYMY0cg4kQVnQAoMmOC1Fxfqv_4SXZQ0s",
  authDomain: "fittrack-bb902.firebaseapp.com",
  projectId: "fittrack-bb902",
  storageBucket: "fittrack-bb902.appspot.com",
  messagingSenderId: "585296844127",
  appId: "1:585296844127:web:a21b76c28cc32065cd92ea",
  measurementId: "G-Z9DLVF9PMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export {auth, provider, db};