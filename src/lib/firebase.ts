import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTP2RsQCPQDPtt4CUXjgygPW1bRId4Zkg",
  authDomain: "sonus-site-ae590.firebaseapp.com",
  projectId: "sonus-site-ae590",
  storageBucket: "sonus-site-ae590.firebasestorage.app",
  messagingSenderId: "565909667177",
  appId: "1:565909667177:web:75f88be43cfe933abd51f8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
