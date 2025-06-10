import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3MaH1F_qVzpHukRTTNsVTFAmD9Y--M0g",
  authDomain: "gamifieddashboard-54648.firebaseapp.com",
  projectId: "gamifieddashboard-54648",
  storageBucket: "gamifieddashboard-54648.appspot.com",
  messagingSenderId: "427623241672",
  appId: "1:427623241672:web:33ad91547d033b703992fd",
  measurementId: "G-8EHNMS1Q7H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- THIS LINE IS IMPORTANT!
export default app;