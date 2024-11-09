// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBODAMY8YtV-2vv-mmEcdveCfkHfa3Dvpc",
  authDomain: "fashionstore-3d195.firebaseapp.com",
  projectId: "fashionstore-3d195",
  storageBucket: "fashionstore-3d195.firebasestorage.app",
  messagingSenderId: "799913536954",
  appId: "1:799913536954:web:6f86fb8db6815abb3dc183",
  measurementId: "G-C1JXCJFQNQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
