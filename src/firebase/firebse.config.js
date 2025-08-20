// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZjH45eqB_5IlKwRTdTSSVB0k_jxJw1AY",
  authDomain: "medical-client-c72fb.firebaseapp.com",
  projectId: "medical-client-c72fb",
  storageBucket: "medical-client-c72fb.firebasestorage.app",
  messagingSenderId: "261133498361",
  appId: "1:261133498361:web:f13089715085198b28ef28"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default app;