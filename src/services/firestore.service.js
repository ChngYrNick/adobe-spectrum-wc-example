import {getFirestore, collection, getDocs} from 'firebase/firestore';

import {firebaseApp} from './firebase.service.js';

const firestore = getFirestore(firebaseApp);

export default {
  getDocs: (name) => getDocs(collection(firestore, name)),
};
