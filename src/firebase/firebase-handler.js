import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCZeZknurXiVZqnV3Sf1ub-uQPEPahKBrc",
    authDomain: "health-wealth-a6ae7.firebaseapp.com",
    databaseURL: "https://health-wealth-a6ae7.firebaseio.com",
    projectId: "health-wealth-a6ae7",
    storageBucket: "health-wealth-a6ae7.appspot.com",
    messagingSenderId: "973025799652",
    appId: "1:973025799652:web:236e3abcb3086f10e7abf1",
    measurementId: "G-H8XDDCMLL9"
  };

  firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();