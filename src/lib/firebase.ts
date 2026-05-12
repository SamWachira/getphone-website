import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * Firebase client configuration for the Getphone website.
 * These are public identifiers, not secrets.
 */
const firebaseConfig = {
  apiKey: "AIzaSyBMLnCLImu8DVLATLJzcPNQQlrsOvFF7i0",
  authDomain: "getphone-website.firebaseapp.com",
  projectId: "getphone-website",
  storageBucket: "getphone-website.firebasestorage.app",
  messagingSenderId: "577769500526",
  appId: "1:577769500526:web:eb936cef6d161b4aff5b7f",
  measurementId: "G-XGHWBFNM8L",
};

// Initialize Firebase (avoid re-initialization in hot-reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export default app;
