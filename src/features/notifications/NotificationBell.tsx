'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

export function NotificationBell() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'notifications'), where('to', '==', user.uid), where('read', '==', false));
    const unsub = onSnapshot(q, (snap) => setCount(snap.size));
    return unsub;
  }, [user]);

  const markAllRead = async () => {
    if (!user) return;
    const q = query(collection(db, 'notifications'), where('to', '==', user.uid), where('read', '==', false));
    onSnapshot(q, (snap) => {
      snap.docs.forEach((d) => updateDoc(doc(db, 'notifications', d.id), { read: true }));
    });
  };

  if (!user) return null;

  return (
    <button onClick={markAllRead} className="relative">
      <span>🔔</span>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
          {count}
        </span>
      )}
    </button>
  );
}
