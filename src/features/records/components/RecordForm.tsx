'use client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { db } from '@/lib/firebase';
import { encryptText } from '@/lib/encryption';
import {
  addPendingRecord,
  syncPendingRecords,
} from '@/lib/offlineRecords';
import { Button } from '@/components/Button';

const schema = z.object({
  notes: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function RecordForm({ patientId }: { patientId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const enc = await encryptText(data.notes);
      await addDoc(collection(db, 'patients', patientId, 'records'), {
        encrypted: enc.data,
        iv: enc.iv,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Erro ao salvar online, armazenando localmente', err);
      await addPendingRecord(patientId, data.notes);
    }
    reset();
  };

  useEffect(() => {
    syncPendingRecords();
    window.addEventListener('online', syncPendingRecords);
    return () => {
      window.removeEventListener('online', syncPendingRecords);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <textarea
        {...register('notes')}
        className="w-full p-2 border rounded"
        rows={6}
        placeholder="Anota\xE7\xF5es"
      />
      {errors.notes && <p className="text-red-500 text-sm">{errors.notes.message}</p>}
      <Button type="submit">Salvar</Button>
    </form>
  );
}
