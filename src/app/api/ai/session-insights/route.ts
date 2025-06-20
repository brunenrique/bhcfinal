import { analyzeSession } from '@/ai/flows';
import appRoute from '@genkit-ai/next';

export const POST = appRoute(analyzeSession);
export const dynamic = 'force-dynamic';

