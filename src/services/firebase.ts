import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig, validateFirebaseConfig } from '../config/firebase.config';

// Validate configuration on initialization
if (!validateFirebaseConfig(firebaseConfig)) {
  console.error('Firebase configuration validation failed');
  throw new Error('Invalid Firebase configuration');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth: Auth = getAuth(app);

export { auth };
export default app;