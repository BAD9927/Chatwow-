import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB68cS35UuERwkXA4wo6SV8FF9XVGBqYB0",
  authDomain: "chatwow-54a3e.firebaseapp.com",
  projectId: "chatwow-54a3e",
  storageBucket: "chatwow-54a3e.appspot.com",
  messagingSenderId: "852835973931",
  appId: "1:852835973931:web:e483a0228a3cd303caa36e",
  measurementId: "G-S8XXBXHWQN"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);