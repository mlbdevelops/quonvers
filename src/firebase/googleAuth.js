import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuhrKadXUM3KF6ZD2fdCT6WEy7exh2XAE",
  authDomain: "quonvers.firebaseapp.com",
  projectId: "quonvers",
  storageBucket: "quonvers.firebasestorage.app",
  messagingSenderId: "62094508539",
  appId: "1:62094508539:web:84bba378f8efdaa0674b5e",
  measurementId: "G-K16XSB4W1G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };