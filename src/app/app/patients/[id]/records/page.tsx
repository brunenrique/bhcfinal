import Link from 'next/link';
import { features } from '@/config/features';
import { RecordList } from '@/features/records/RecordList';

export default function PatientRecordsPage({ params }: { params: { id: string } }) {
  if (!features.records) return null;
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Prontu\xE1rios</h1>
      <Link href={`/app/patients/${params.id}/records/new`} className="text-blue-600">Novo registro</Link>
      <RecordList patientId={params.id} />
    </main>
  );
}
