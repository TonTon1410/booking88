import { initializeApp  } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA30guEVzhYhr_Q8eV3GygtunWTCSIWBgA",
  authDomain: "booking88-9b258.firebaseapp.com",
  projectId: "booking88-9b258",
  storageBucket: "booking88-9b258.appspot.com",
  messagingSenderId: "941063340786",
  appId: "1:941063340786:web:b485faded57317612c866b",
  measurementId: "G-4HQEHR9EWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();



export{provider, auth, app, storage, db}