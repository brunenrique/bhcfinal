export async function getKey(): Promise<CryptoKey> {
  const { get, set } = await import('idb-keyval');
  const KEY_NAME = 'encryptionKey';
  let stored = await get(KEY_NAME);
  if (stored) {
    return crypto.subtle.importKey('raw', stored, 'AES-GCM', true, [
      'encrypt',
      'decrypt',
    ]);
  }
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  const exported = await crypto.subtle.exportKey('raw', key);
  await set(KEY_NAME, exported);
  return key;
}

export async function encryptText(plain: string) {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plain);
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  return {
    data: btoa(String.fromCharCode(...new Uint8Array(ct))),
    iv: btoa(String.fromCharCode(...iv)),
  };
}

export async function decryptText(data: string, iv: string) {
  const key = await getKey();
  const buf = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
  const ivBuf = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuf }, key, buf);
  return new TextDecoder().decode(plain);
}
