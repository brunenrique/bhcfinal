import { collection, getDocs, query, where } from 'firebase/firestore';
import { addDays, startOfDay } from 'date-fns';
import { db } from './firebase';

export async function suggestNextSlot(): Promise<string | null> {
  const today = startOfDay(new Date());
  for (let i = 0; i < 30; i++) {
    const date = addDays(today, i);
    const iso = date.toISOString().slice(0, 10);
    const q = query(collection(db, 'appointments'), where('date', '==', iso));
    const snap = await getDocs(q);
    if (snap.empty) {
      return `${iso}T09:00`;
    }
  }
  return null;
}
