import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOkZwwtWP0xKH_MU1Vm7bf2fTv3SHi1rY",
  authDomain: "e-commerceproject-1bcfb.firebaseapp.com",
  projectId: "e-commerceproject-1bcfb",
  storageBucket: "e-commerceproject-1bcfb.firebasestorage.app",
  messagingSenderId: "150667056795",
  appId: "1:150667056795:web:9f6a2238fc10e4a0a9183e",
  measurementId: "G-DVGX5YM78N",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
