import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export async function addToWaitingList(patientId: string, priority = 1) {
  await addDoc(collection(db, 'waitingList'), {
    patientId,
    priority,
    addedAt: serverTimestamp(),
  });
}
