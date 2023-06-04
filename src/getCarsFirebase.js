import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export default async function getCar(make, model, type) {
  const docRef = doc(db, 'cars', 'copart', make, model, type, type);
  const docSnap = await getDoc(docRef);
  if (docSnap.data()) {
    return docSnap.data();
  }
}
