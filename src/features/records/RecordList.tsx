'use client';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { decryptText } from '@/lib/encryption';

interface RecordData {
  id: string;
  notes: string;
}

export function RecordList({ patientId }: { patientId: string }) {
  const [records, setRecords] = useState<RecordData[]>([]);

  useEffect(() => {
    getDocs(query(collection(db, 'patients', patientId, 'records'), orderBy('createdAt', 'desc'))).then(async (snap) => {
      const items = await Promise.all(
        snap.docs.map(async (d) => {
          const { encrypted, iv } = d.data() as any;
          const notes = await decryptText(encrypted, iv);
          return { id: d.id, notes };
        })
      );
      setRecords(items);
    });
  }, [patientId]);

  return (
    <ul className="space-y-2">
      {records.map((r) => (
        <li key={r.id} className="p-2 border rounded">
          {r.notes}
        </li>
      ))}
    </ul>
  );
}
