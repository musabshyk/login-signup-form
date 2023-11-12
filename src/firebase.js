import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMmdVOO9YpiL7DWHG7D9zE5ECGXkNKUCM",
  authDomain: "fir-auth-111-85ce2.firebaseapp.com",
  projectId: "fir-auth-111-85ce2",
  storageBucket: "fir-auth-111-85ce2.appspot.com",
  messagingSenderId: "252446783244",
  appId: "1:252446783244:web:35a7000489882c6ee1fb29",
  measurementId: "G-9TCJW8MCK3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };

