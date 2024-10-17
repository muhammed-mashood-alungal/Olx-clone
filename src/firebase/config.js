import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage';  
const firebaseConfig = {
    apiKey: "AIzaSyD-yz-1z8NG0QWECuvhvOFI3Rj6848bsF0",
    authDomain: "olx-clone-98937.firebaseapp.com",
    projectId: "olx-clone-98937",
    storageBucket: "olx-clone-98937.appspot.com",
    messagingSenderId: "444466785609",
    appId: "1:444466785609:web:2c19bbfa5378f81b5afe98",
    measurementId: "G-0MPZMKP72N"
  };

  export default firebase.initializeApp(firebaseConfig)  