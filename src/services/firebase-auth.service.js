import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';

import {firebaseApp} from './firebase.service.js';

const firebaseAuth = getAuth(firebaseApp);

const facebookProvider = new FacebookAuthProvider();

const googleProvider = new GoogleAuthProvider();

export default {
  facebookProvider,
  googleProvider,
  signInWithPopup: (provider) => signInWithPopup(firebaseAuth, provider),
  signOut: () => signOut(firebaseAuth),
  onAuthStateChanged: (...args) => onAuthStateChanged(firebaseAuth, ...args),
};
