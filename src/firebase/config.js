import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAvuTEz1xF6SlV7zqL6M6aOftuqW75TTVo",
  authDomain: "react-firegram-f1d55.firebaseapp.com",
  projectId: "react-firegram-f1d55",
  storageBucket: "react-firegram-f1d55.appspot.com",
  messagingSenderId: "286721331863",
  appId: "1:286721331863:web:e2e01cb54c43927d348fd2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig); // connects app to backend firebase

// Initialize storage & firestore service
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

// TimeStamp - to order docs by time stamp and show them chronologically on screen
// this returns a function
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timeStamp };