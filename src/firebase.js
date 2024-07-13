// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; 
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0GH_0AAY6uoobzC3UgTtOJgdsHfE9AeA",
  authDomain: "tesla-s-lamp.firebaseapp.com",
  projectId: "tesla-s-lamp",
  storageBucket: "tesla-s-lamp.appspot.com",
  messagingSenderId: "402493586948",
  appId: "1:402493586948:web:7946b43c70501c762fff51",
  measurementId: "G-W9WGRG62ZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  } catch (error) {
    console.error("Error signing in: ", error);
  }
};

const logOut = () => {
  return signOut(auth);
};


const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
};

export { auth, signInWithGoogle, logOut, fetchUsers };