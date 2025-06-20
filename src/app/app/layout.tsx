'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { NotificationBell } from '@/features/notifications/NotificationBell';

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISABLE_AUTH !== 'true' && !user) {
      router.push('/login');
    }
  }, [user, router]);

  if (process.env.NEXT_PUBLIC_DISABLE_AUTH !== 'true' && !user) return null;

  return (
    <div>
      <header className="p-2 border-b flex justify-end">
        <NotificationBell />
      </header>
      {children}
    </div>
  );
}
