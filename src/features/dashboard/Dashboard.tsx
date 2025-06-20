import { features } from '@/config/features';

export function Dashboard() {
  if (!features.dashboard) return null;
  return <section className="mt-4">Dashboard habilitado</section>;
}
