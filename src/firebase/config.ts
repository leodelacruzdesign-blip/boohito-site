import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';

// Firebase configuration using the project ID found in your production links
// Note: In a production environment, these should be populated via environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForInitialization", 
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-71031585-aa88e.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-71031585-aa88e",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "studio-71031585-aa88e.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

export function getFirebaseConfig() {
  return firebaseConfig;
}

export function getFirebaseApp(): FirebaseApp {
  const existingApps = getApps();
  if (existingApps.length > 0) {
    return existingApps[0];
  }
  
  // Basic validation to prevent crashing on missing keys during the prototype phase
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "undefined") {
    console.warn("Firebase API Key is missing. Check your .env file.");
  }
  
  return initializeApp(firebaseConfig);
}
