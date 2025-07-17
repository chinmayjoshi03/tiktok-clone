import { FirebaseOptions } from 'firebase/app';
import Constants from 'expo-constants';

export const firebaseConfig: FirebaseOptions = {
    apiKey: Constants.expoConfig?.extra?.firebaseApiKey || "AIzaSyAqshELRmboi_FpQDRhugvZ__VkczzmoIs",
    authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || "tiktokclone-5cd16.firebaseapp.com",
    projectId: Constants.expoConfig?.extra?.firebaseProjectId || "tiktokclone-5cd16",
    storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || "tiktokclone-5cd16.firebasestorage.app",
    messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId || "108296114754",
    appId: Constants.expoConfig?.extra?.firebaseAppId || "1:108296114754:web:1b62e731b495a7e3f4d3db",
};

export const validateFirebaseConfig = (config: FirebaseOptions): boolean => {
    const requiredFields = [
        'apiKey',
        'authDomain',
        'projectId',
        'storageBucket',
        'messagingSenderId',
        'appId'
    ];

    for (const field of requiredFields) {
        if (!config[field as keyof FirebaseOptions]) {
            console.error(`Firebase config missing required field: ${field}`);
            return false;
        }
    }

    return true;
};