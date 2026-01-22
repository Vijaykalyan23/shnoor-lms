// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Use Vite env variables when available. Fall back to embedded config for local/dev convenience.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBpZO0Dur9Uh7uoamVzHlQtXFf6NHrmn-w",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "shnoor-lms.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "shnoor-lms",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "shnoor-lms.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "97142691230",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:97142691230:web:11699afa66b1d3b6f8f28f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-CL09Q2SGB5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Note: For production, move the above values to a `.env` file and do NOT commit secrets.