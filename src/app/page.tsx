import { Dashboard } from '@/features/dashboard';

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Bem-vindo ao Thalamus</h1>
      <Dashboard />
    </main>
  );
}
