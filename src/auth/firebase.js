import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBmrcuw21jbqnL6dP2OQufvhhEibRHMU50",
//   authDomain: "shnoor-lms-e1f44.firebaseapp.com",
//   projectId: "shnoor-lms-e1f44",
//   storageBucket: "shnoor-lms-e1f44.firebasestorage.app",
//   messagingSenderId: "628973656264",
//   appId: "1:628973656264:web:e6373537b71e2985372dfd",
//   measurementId: "G-51X474W04J"
// };


const firebaseConfig = {
  apiKey: "AIzaSyBivFP3UtisYkNIsFpRH7vGSEo0mf8j4sg",
  authDomain: "shnoor-lms-f5ecb.firebaseapp.com",
  projectId: "shnoor-lms-f5ecb",
  storageBucket: "shnoor-lms-f5ecb.firebasestorage.app",
  messagingSenderId: "1016439072054",
  appId: "1:1016439072054:web:9864ecd018e66bf74b3f97",
  measurementId: "G-ER7HT1371C"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };