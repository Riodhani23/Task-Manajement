// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "task-management-petik.firebaseapp.com",
  projectId: "task-management-petik",
  storageBucket: "task-management-petik.appspot.com",
  messagingSenderId: "1094937538123",
  appId: "1:1094937538123:web:5dbf71101783d4fed767ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);