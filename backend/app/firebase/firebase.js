// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: "scambusters-91173",
  storageBucket: "scambusters-91173.firebasestorage.app",
  messagingSenderId: "601145547336",
  appId: "1:601145547336:web:7ce17e1426bdebcc76167d",
  measurementId: "G-ZYK4K7H2EK",
};
// Initialize Firebase
try {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  module.exports = { db };
} catch (error) {
  console.error("Error initializing Firebase:", error.toString());
  throw new Error("Failed to initialize Firebase");
}
