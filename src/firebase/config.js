import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCd0HNgxUR2Xvq5_JMlwqezxrOm6WhEU-0",
    authDomain: "olx-clone-de5f7.firebaseapp.com",
    projectId: "olx-clone-de5f7",
    storageBucket: "olx-clone-de5f7.firebasestorage.app",
    messagingSenderId: "31445042572",
    appId: "1:31445042572:web:5b8d9e31c54cb6efa002a9",
    measurementId: "G-0X6Q6D7QW1"
  };

  const firebaseApp = initializeApp(firebaseConfig)
  const auth = getAuth(firebaseApp)
  const firestore = getFirestore(firebaseApp)

  // export default firebaseApp
  export {firebaseApp, auth, firestore};