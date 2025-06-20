'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'notifications'), where('to', '==', user.uid));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    });
    return unsub;
  }, [user]);

  const markRead = async (id: string) => {
    await updateDoc(doc(db, 'notifications', id), { read: true });
  };

  if (!user) return null;

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Notificações</h1>
      <ul className="space-y-2">
        {items.map((n) => (
          <li key={n.id} className="p-2 border rounded flex justify-between">
            <span>{n.message}</span>
            {!n.read && (
              <button onClick={() => markRead(n.id)} className="underline">
                Marcar como lida
              </button>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
