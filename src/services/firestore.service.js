import {
  getFirestore,
  collection,
  getDocs,
  query,
  onSnapshot,
} from 'firebase/firestore';

import {firebaseApp} from './firebase.service.js';

const firestore = getFirestore(firebaseApp);

export default {
  getDocs: (name) => getDocs(collection(firestore, name)),
  query: (name, ...args) => query(collection(firestore, name), ...args),
  onSnapshot: (query, cb) => onSnapshot(query, cb),
};
