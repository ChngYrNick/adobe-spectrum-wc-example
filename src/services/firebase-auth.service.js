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

export default {
  facebookProvider: new FacebookAuthProvider(),
  googleProvider: new GoogleAuthProvider(),
  signInWithPopup: (provider) => signInWithPopup(firebaseAuth, provider),
  signOut: () => signOut(firebaseAuth),
  onAuthStateChanged: (...args) => onAuthStateChanged(firebaseAuth, ...args),
};
