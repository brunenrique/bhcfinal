'use client';
import { useState, useEffect } from 'react';
import { runFlow } from '@genkit-ai/next/client';
import { suggestTemplate } from '@/ai/flows';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/Button';

interface Block {
  id: string;
  title: string;
  text: string;
  hidden: boolean;
}

const defaultBlocks: Block[] = [
  { id: 'objective', title: 'Objetivo', text: '', hidden: false },
  { id: 'intervention', title: 'Interven\xE7\xE3o', text: '', hidden: false },
  { id: 'response', title: 'Resposta', text: '', hidden: false },
  { id: 'plan', title: 'Plano de A\xE7\xE3o', text: '', hidden: false },
];

export function SessionEditor({ patientId }: { patientId: string }) {
  const { user } = useAuth();
  const [blocks, setBlocks] = useState<Block[]>(defaultBlocks);
  const [dragId, setDragId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'preferences', 'sessionEditor');
    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        const data = snap.data() as any;
        setBlocks((prev) =>
          prev.map((b) => ({ ...b, hidden: data.hidden?.includes(b.id) ?? false }))
        );
      }
    });
  }, [user]);

  const savePrefs = async () => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'preferences', 'sessionEditor');
    await setDoc(
      ref,
      {
        hidden: blocks.filter((b) => b.hidden).map((b) => b.id),
      },
      { merge: true },
    );
  };

  const handleDragStart = (id: string) => () => setDragId(id);
  const handleDrop = (id: string) => () => {
    if (!dragId) return;
    setBlocks((bl) => {
      const from = bl.findIndex((b) => b.id === dragId);
      const to = bl.findIndex((b) => b.id === id);
      const arr = [...bl];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr;
    });
    setDragId(null);
  };

  const toggleBlock = (id: string) => {
    setBlocks((bl) => bl.map((b) => (b.id === id ? { ...b, hidden: !b.hidden } : b)));
  };

  const autofill = async () => {
    const res = await runFlow<typeof suggestTemplate>({
      url: '/api/ai/suggest-template',
      input: { topic: 'geral' },
    });
    setBlocks((bl) => bl.map((b) => ({ ...b, text: res.template })));
  };

  return (
    <div className="flex">
      <div className="flex-1 space-y-4">
        {blocks.map(
          (block) =>
            !block.hidden && (
              <div
                key={block.id}
                draggable
                onDragStart={handleDragStart(block.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop(block.id)}
                className="border rounded p-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{block.title}</h3>
                  <button type="button" onClick={() => toggleBlock(block.id)}>
                    Ocultar
                  </button>
                </div>
                <textarea
                  value={block.text}
                  onChange={(e) =>
                    setBlocks((bl) =>
                      bl.map((b) => (b.id === block.id ? { ...b, text: e.target.value } : b))
                    )
                  }
                  className="w-full p-2 border rounded mt-2"
                  rows={4}
                />
              </div>
            ),
        )}
      </div>
      <div className="w-60 ml-4 space-y-2">
        <h3 className="font-bold">Mini-Assistente</h3>
        <Button type="button" onClick={autofill} className="w-full">
          Sugerir Template
        </Button>
        <Button type="button" onClick={savePrefs} className="w-full">
          Salvar Prefer\xEAncias
        </Button>
        <p className="text-sm text-muted-foreground">
          Arraste os blocos para reorganizar ou clique em ocultar.
        </p>
      </div>
    </div>
  );
}

