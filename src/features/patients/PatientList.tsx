'use client';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';

interface Patient {
  id: string;
  name: string;
  contact?: string;
}

export function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    getDocs(collection(db, 'patients')).then((snap) => {
      setPatients(
        snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Patient, 'id'>) }))
      );
    });
  }, []);

  return (
    <ul className="space-y-2">
      {patients.map((p) => (
        <li key={p.id} className="p-2 border rounded">
          {p.name}
        </li>
      ))}
    </ul>
  );
}
