'use client';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';

interface Session {
  id: string;
  date: string;
}

export function PatientSessions({ patientId }: { patientId: string }) {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    getDocs(collection(db, 'patients', patientId, 'sessions')).then((snap) => {
      setSessions(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Session, 'id'>) })));
    });
  }, [patientId]);

  return (
    <ul className="space-y-2">
      {sessions.map((s) => (
        <li key={s.id} className="p-2 border rounded">
          {s.date}
        </li>
      ))}
    </ul>
  );
}
