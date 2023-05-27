// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { 
    getAuth,
    signInWithEmailAndPassword,
    signOut 
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAb5jzc6xUSI8XTU8_xAuqKBBhiwXobUgA",
    authDomain: "g7caps-6a93d.firebaseapp.com",
    databaseURL: "https://g7caps-6a93d-default-rtdb.firebaseio.com",
    projectId: "g7caps-6a93d",
    storageBucket: "g7caps-6a93d.appspot.com",
    messagingSenderId: "983842652512",
    appId: "1:983842652512:web:31f0a319a576a5ff039e05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const auth = getAuth(app);

const logInAuth = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
    }
};

const logOutAuth = () => {
    signOut(auth);
};

export {
    db,
    auth,
    logInAuth,
    logOutAuth
}