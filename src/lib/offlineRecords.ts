import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from './firebase';
import { encryptText } from './encryption';

const STORE_PREFIX = 'pendingRecord-';

export interface PendingRecord {
  id: string;
  patientId: string;
  notes: string;
}

async function kv() {
  return await import('idb-keyval');
}

export async function addPendingRecord(patientId: string, notes: string) {
  const { set } = await kv();
  const id = `${STORE_PREFIX}${nanoid()}`;
  await set(id, { patientId, notes });
}

export async function getAllPendingRecords(): Promise<PendingRecord[]> {
  const { keys, get } = await kv();
  const all = await keys();
  const recKeys = all.filter((k) => typeof k === 'string' && k.startsWith(STORE_PREFIX));
  const items: PendingRecord[] = [];
  for (const key of recKeys) {
    const data = await get(key);
    if (data) items.push({ id: key as string, ...(data as any) });
  }
  return items;
}

export async function removePendingRecord(id: string) {
  const { del } = await kv();
  await del(id);
}

export async function syncPendingRecords() {
  const records = await getAllPendingRecords();
  for (const r of records) {
    try {
      const enc = await encryptText(r.notes);
      await addDoc(collection(db, 'patients', r.patientId, 'records'), {
        encrypted: enc.data,
        iv: enc.iv,
        createdAt: serverTimestamp(),
      });
      await removePendingRecord(r.id);
    } catch (err) {
      console.error('Falha ao sincronizar registro', err);
    }
  }
}
