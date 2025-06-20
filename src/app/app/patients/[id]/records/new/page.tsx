import { features } from '@/config/features';
import { RecordForm } from '@/features/records';

export default function NewRecordPage({ params }: { params: { id: string } }) {
  if (!features.records) return null;
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Novo Prontu\xE1rio</h1>
      <RecordForm patientId={params.id} />
    </main>
  );
}
