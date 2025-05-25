// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAynZo2Y2BlddFEmKad28GxHY5F953615M',
  authDomain: 'scambusters-91173.firebaseapp.com',
  databaseURL:
    'https://scambusters-91173-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'scambusters-91173',
  storageBucket: 'scambusters-91173.firebasestorage.app',
  messagingSenderId: '601145547336',
  appId: '1:601145547336:web:f7d8d3288717765776167d',
  measurementId: 'G-9JX190CHV3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth };
