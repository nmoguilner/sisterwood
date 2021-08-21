import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDPvDJGTQ9Ooiqs_4zZ5W6YCgF_wPeaBTY",
    authDomain: "sisterwood-ff8a2.firebaseapp.com",
    databaseURL: "https://sisterwood-ff8a2-default-rtdb.firebaseio.com",
    projectId: "sisterwood-ff8a2",
    storageBucket: "sisterwood-ff8a2.appspot.com",
    messagingSenderId: "541581266331",
    appId: "1:541581266331:web:c85f295940de57eef5a53e",
    measurementId: "G-S3VHFMX5Q4"
  };


let app = null;
if (!firebase.apps.length) {
  // Initialize Firebase
  app = firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
}

export default firebase

