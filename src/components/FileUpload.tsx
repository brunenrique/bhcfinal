'use client';
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export function FileUpload({ path }: { path: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const fileRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(fileRef, file);
    const download = await getDownloadURL(fileRef);
    setUrl(download);
    setFile(null);
  };

  return (
    <div className="space-y-2">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="px-4 py-2 bg-primary text-white rounded">
        Enviar
      </button>
      {url && (
        <p>
          Arquivo enviado: <a href={url} className="underline">{file?.name}</a>
        </p>
      )}
    </div>
  );
}
