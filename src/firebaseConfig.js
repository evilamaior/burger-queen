import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDJu1tWky4QBUq4GIVbCl84sU-v2qzTzP0",
  authDomain: "burger-queen-99d68.firebaseapp.com",
  databaseURL: "https://burger-queen-99d68.firebaseio.com",
  projectId: "burger-queen-99d68",
  storageBucket: "burger-queen-99d68.appspot.com",
  messagingSenderId: "165785882713",
  appId: "1:165785882713:web:d39e596eb20247f7"
};

firebase.initializeApp(config);

export default firebase;