// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-8c0c3.firebaseapp.com",
  projectId: "mern-auth-8c0c3",
  storageBucket: "mern-auth-8c0c3.firebasestorage.app",
  messagingSenderId: "933750753153",
  appId: "1:933750753153:web:32ee21077866ed26748a80"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);