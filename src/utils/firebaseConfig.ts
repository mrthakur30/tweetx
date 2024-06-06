import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj8a-ntsDYKB2CWtrmgtHQW74xhrDdiAQ",
  authDomain: "tweetx-7ff38.firebaseapp.com",
  projectId: "tweetx-7ff38",
  storageBucket: "tweetx-7ff38.appspot.com",
  messagingSenderId: "582568517760",
  appId: "1:582568517760:web:7bceeec2fd05ddfaa84665",
  measurementId: "G-F26M72VWM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };