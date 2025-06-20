import { features } from '@/config/features';
import { PatientList } from '@/features/patients';

export default function PatientsPage() {
  if (!features.patients) return null;
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Pacientes</h1>
      <PatientList />
    </main>
  );
}
