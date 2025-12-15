// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration object with your credentials
// const firebaseConfig = {
//   apiKey: "AIzaSyAilevbBFNqNkt8zy00jwOxng1FbKjjUGo",
//   authDomain: "rajmotors-auth.firebaseapp.com",
//   projectId: "rajmotors-auth",
//   storageBucket: "rajmotors-auth.firebasestorage.app",
//   messagingSenderId: "31690262108",
//   appId: "1:31690262108:web:535bb835f54fcd0d4b0899"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDGm0Yoss20ketxJWfh9Hz-XB5Tq5s4fHU",
  authDomain: "rental-bike-116c8.firebaseapp.com",
  projectId: "rental-bike-116c8",
  storageBucket: "rental-bike-116c8.firebasestorage.app",
  messagingSenderId: "154083477050",
  appId: "1:154083477050:web:85b7cf1e5526bfa2bf9703",
  measurementId: "G-C48XDY1T6L"
};

// Initialize Firebase app with the config
// This creates a singleton Firebase app instance
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
// We'll use this to signIn with phone number and verify OTP
export const auth = getAuth(app);

// Export app for any other Firebase services you might use later
export default app;

/**
 * LINE-BY-LINE EXPLANATION:
 * 
 * 1. We import initializeApp and getAuth from firebase/app and firebase/auth
 * 2. firebaseConfig object contains your credentials from Firebase Console
 * 3. initializeApp(firebaseConfig) - Connects your app to Firebase project
 * 4. getAuth(app) - Gets the authentication module from Firebase
 * 5. We export 'auth' so other files can use it for phone authentication
 * 
 * WHAT HAPPENS:
 * - When your app loads, this file is imported
 * - Firebase initializes and connects to your project
 * - The 'auth' object is ready to use for phone sign-in
 */
