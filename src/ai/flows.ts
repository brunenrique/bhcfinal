import { genkit } from 'genkit';
import { googleAI, gemini } from '@genkit-ai/googleai';
import { z } from 'zod';

const ai = genkit({
  plugins: [googleAI()],
  model: gemini('gemini-1.5-flash'),
});

export const analyzeSession = ai.defineFlow(
  {
    name: 'analyzeSession',
    inputSchema: z.object({ text: z.string() }),
    outputSchema: z.object({
      keywords: z.array(z.string()),
      themes: z.array(z.string()),
    }),
  },
  async ({ text }) => {
    const { text: result } = await ai.generate({
      prompt:
        'Analise o texto a seguir e extraia palavras-chave e possiveis temas de terapia em JSON: ' +
        text,
    });
    return JSON.parse(result);
  },
);

export const suggestTemplate = ai.defineFlow(
  {
    name: 'suggestTemplate',
    inputSchema: z.object({ topic: z.string() }),
    outputSchema: z.object({ template: z.string() }),
  },
  async ({ topic }) => {
    const { text: tpl } = await ai.generate({
      prompt: 'Sugira um template de sessao para o tema: ' + topic,
    });
    return { template: tpl };
  },
);

