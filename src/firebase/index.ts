import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS36OmqCr6SNHC5oq3GoF2RSSX-sq38Cs",
  authDomain: "memberships-test-app.firebaseapp.com",
  projectId: "memberships-test-app",
  storageBucket: "memberships-test-app.appspot.com",
  messagingSenderId: "862580015981",
  appId: "1:862580015981:web:77d4900831b10ac4fb5064",
};

const app = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(app);
