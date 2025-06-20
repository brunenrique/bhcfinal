'use client';
import { useEffect, useState } from 'react';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { FileUpload } from '@/components/FileUpload';

export default function ResourcesPage() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const list = await listAll(ref(storage, 'resources'));
      const urls = await Promise.all(list.items.map((i) => getDownloadURL(i)));
      setFiles(urls);
    };
    fetchFiles();
  }, []);

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Recursos</h1>
      <FileUpload path="resources" />
      <ul className="space-y-2">
        {files.map((u) => (
          <li key={u}>
            <a href={u} className="underline" target="_blank" rel="noopener noreferrer">
              {u.split('/').pop()}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
