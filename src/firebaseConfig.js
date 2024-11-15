// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdiIIFIBEz24Z1uynpClJ4OWD9RhjCtWw",
    authDomain: "demopro-24e5b.firebaseapp.com",
    projectId: "demopro-24e5b",
    storageBucket: "demopro-24e5b.appspot.com",
    messagingSenderId: "87655254134",
    appId: "1:87655254134:web:80a4f0f6715701a8e43757",
    measurementId: "G-JDTCDECEMJ"
  };

// Initialize Firebase with error handling
let app;
let db;
let auth;
let storage;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

// Custom error handling wrapper for Firebase operations
const handleFirebaseError = (error) => {
    console.error("Firebase operation failed:", error);
    throw new Error(error.message);
};

export { db, auth, storage, handleFirebaseError };
