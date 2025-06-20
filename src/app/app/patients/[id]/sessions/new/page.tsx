import { features } from '@/config/features';
import { SessionEditor } from '@/features/sessions';

export default function NewSessionPage({ params }: { params: { id: string } }) {
  if (!features.sessions) return null;
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Nova Sess\xE3o</h1>
      <SessionEditor patientId={params.id} />
    </main>
  );
}

