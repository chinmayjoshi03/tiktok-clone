import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAqshELRmboi_FpQDRhugvZ__VkczzmoIs",
  authDomain: "tiktokclone-5cd16.firebaseapp.com",
  projectId: "tiktokclone-5cd16",
  storageBucket: "tiktokclone-5cd16.firebasestorage.app",
  messagingSenderId: "108296114754",
  appId: "1:1:108296114754:web:1b62e731b495a7e3f4d3db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;