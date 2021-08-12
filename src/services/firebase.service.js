import {initializeApp} from 'firebase/app';

import firebaseConfig from '../config/firebase.config.js';

const firebaseApp = initializeApp(firebaseConfig);

export {firebaseApp};
