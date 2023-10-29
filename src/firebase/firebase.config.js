// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVlUVLQg0gK0LXk-uQPjqpWsJmZu3L2q0",
  authDomain: "user-auth-bade3.firebaseapp.com",
  projectId: "user-auth-bade3",
  storageBucket: "user-auth-bade3.appspot.com",
  messagingSenderId: "625286354818",
  appId: "1:625286354818:web:2fc0b74b06341645e9219b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;