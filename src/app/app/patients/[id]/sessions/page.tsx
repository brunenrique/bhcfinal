import { features } from '@/config/features';
import { PatientSessions } from '@/features/sessions';

export default function PatientSessionsPage({ params }: { params: { id: string } }) {
  if (!features.sessions) return null;
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Sessões</h1>
      <PatientSessions patientId={params.id} />
    </main>
  );
}
