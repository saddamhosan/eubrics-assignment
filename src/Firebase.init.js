import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQTORaAcbxDxswxRBKWjzzQ6GSQAhUotM",
  authDomain: "eubrics-assignment.firebaseapp.com",
  projectId: "eubrics-assignment",
  storageBucket: "eubrics-assignment.appspot.com",
  messagingSenderId: "681635040425",
  appId: "1:681635040425:web:97cdb43326f6476d78adb8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export default auth;
