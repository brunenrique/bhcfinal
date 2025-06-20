import { suggestTemplate } from '@/ai/flows';
import appRoute from '@genkit-ai/next';

export const POST = appRoute(suggestTemplate);
export const dynamic = 'force-dynamic';

