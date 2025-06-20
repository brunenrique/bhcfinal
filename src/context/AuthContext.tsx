'use client';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from '@/lib/firebase';

export interface UserInfo {
  uid: string;
  email: string | null;
  role?: string;
}

interface AuthContextValue {
  user: UserInfo | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
        const role = snap.exists() ? (snap.data() as any).role : undefined;
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email, role });
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const logout = async () => {
    await signOut(auth);
    document.cookie = 'loggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  };

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
