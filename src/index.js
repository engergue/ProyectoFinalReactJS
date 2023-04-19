import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDerlGrA2r8lTeUi4820kXbNmw4tCidhew",
  authDomain: "reactprojectcoderhouse.firebaseapp.com",
  projectId: "reactprojectcoderhouse",
  storageBucket: "reactprojectcoderhouse.appspot.com",
  messagingSenderId: "1019250013946",
  appId: "1:1019250013946:web:e42af60215dd2a478a7b43"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);