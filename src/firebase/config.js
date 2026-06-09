
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEbd9lERnBzhRmHqu6sEJ6ahZcutb7C9s",
  authDomain: "techgen-fdd0d.firebaseapp.com",
  projectId: "techgen-fdd0d",
  storageBucket: "techgen-fdd0d.firebasestorage.app",
  messagingSenderId: "421968093637",
  appId: "1:421968093637:web:35108b352b240663706bac",
  measurementId: "G-DBLTCWYNSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Firestore database
export const db = getFirestore(app);

// Storage (for product images)
export const storage = getStorage(app);

export default app;
