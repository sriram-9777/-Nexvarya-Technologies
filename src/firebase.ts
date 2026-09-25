import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAB1yb43Kv5hMbiHBhxQI_Ok0kfDiyamPo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nexvarya-technologies-7cf8a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nexvarya-technologies-7cf8a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nexvarya-technologies-7cf8a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "737332645785",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:737332645785:web:7ccddb50469a412eb58d08"
};

// Initialize Firebase App instance
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export interface GoogleAuthUser {
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
}

/**
 * Executes Firebase Google OAuth Popup login/signup with your live Nexvarya Firebase project.
 */
export const loginWithGoogleFirebase = async (): Promise<{ user: GoogleAuthUser }> => {
  const result = await signInWithPopup(auth, googleProvider);
  return {
    user: {
    email: result.user.email,
      emailVerified: result.user.emailVerified,
      displayName: result.user.displayName,
      phoneNumber: result.user.phoneNumber,
      photoURL: result.user.photoURL
    }
  };
};
