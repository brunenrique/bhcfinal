'use client';
import { useEffect, useState } from 'react';

export default function CalendarPage() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      const g = (window as any).gapi;
      g.load('client:auth2', async () => {
        await g.client.init({
          clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/calendar.events',
        });
        setAuthorized(g.auth2.getAuthInstance().isSignedIn.get());
      });
    };
    document.body.appendChild(script);
  }, []);

  const signIn = () => {
    const g = (window as any).gapi;
    g.auth2.getAuthInstance().signIn().then(() => setAuthorized(true));
  };

  const signOut = () => {
    const g = (window as any).gapi;
    g.auth2.getAuthInstance().signOut().then(() => setAuthorized(false));
  };

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Google Calendar</h1>
      {authorized ? (
        <button onClick={signOut} className="underline">
          Sair
        </button>
      ) : (
        <button onClick={signIn} className="underline">
          Conectar
        </button>
      )}
    </main>
  );
}
