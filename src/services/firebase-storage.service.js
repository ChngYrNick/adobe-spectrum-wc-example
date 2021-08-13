import {getStorage, uploadBytes, ref, listAll} from 'firebase/storage';

import {firebaseApp} from './firebase.service.js';

const firebaseStorage = getStorage(firebaseApp);

export default {
  uploadBytes: (file) => uploadBytes(ref(firebaseStorage, file.name), file),
  listAll: (reference) => listAll(ref(firebaseStorage, reference)),
};
