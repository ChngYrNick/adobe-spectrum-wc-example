import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './firebase-config.js';

firebase.initializeApp(firebaseConfig);

const facebookProvider = new firebase.auth.FacebookAuthProvider();

facebookProvider.setCustomParameters({
  display: 'popup',
});

const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export {firebase, googleProvider, facebookProvider};
