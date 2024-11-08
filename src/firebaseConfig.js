// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApyqegoBlqwqpOV1KgQ89VykIQSLBFXZA",
    authDomain: "promo-e4d1b.firebaseapp.com",
    projectId: "promo-e4d1b",
    storageBucket: "promo-e4d1b.firebasestorage.app",
    messagingSenderId: "272872875776",
    appId: "1:272872875776:web:625f3c911003d8d3d4f5e5",
    measurementId: "G-99ZZXRK5ZJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
