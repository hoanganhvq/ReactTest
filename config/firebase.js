// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqVCVr1obw1mbIuCu4A4H7my8I5hCLMbQ",
  authDomain: "fir-project-8d9c4.firebaseapp.com",
  projectId: "fir-project-8d9c4",
  storageBucket: "fir-project-8d9c4.firebasestorage.app",
  messagingSenderId: "484465580607",
  appId: "1:484465580607:web:8ba84ffbcb3544092b368a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
