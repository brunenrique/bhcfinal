import { useEffect, useState } from 'react';
import { features } from '@/config/features';
import { db } from '@/lib/firebase';
import { collection, getDocs, collectionGroup } from 'firebase/firestore';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface Metrics {
  patients: number;
  sessions: number;
}

export function Dashboard() {
  if (!features.dashboard) return null;
  const [metrics, setMetrics] = useState<Metrics>({ patients: 0, sessions: 0 });

  useEffect(() => {
    Promise.all([
      getDocs(collection(db, 'patients')),
      getDocs(collectionGroup(db, 'sessions')),
    ]).then(([pSnap, sSnap]) => {
      setMetrics({ patients: pSnap.size, sessions: sSnap.size });
    });
  }, []);

  const data = [
    { name: 'Pacientes', value: metrics.patients },
    { name: 'Sessões', value: metrics.sessions },
  ];

  return (
    <section className="mt-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
