'use client';
import { useState } from 'react';
import { runFlow } from '@genkit-ai/next/client';
import { analyzeSession } from '@/ai/flows';
import { Button } from '@/components/Button';

interface Insights {
  keywords: string[];
  themes: string[];
}

export function SessionInsights() {
  const [text, setText] = useState('');
  const [insights, setInsights] = useState<Insights | null>(null);

  const handleAnalyze = async () => {
    const result = await runFlow<typeof analyzeSession>({
      url: '/api/ai/session-insights',
      input: { text },
    });
    setInsights(result);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
        placeholder="Anota\xE7\xF5es da sess\xE3o"
      />
      <Button type="button" onClick={handleAnalyze} className="block">
        Gerar Insights
      </Button>
      {insights && (
        <div className="space-y-2">
          <div>
            <h3 className="font-bold">Palavras-chave</h3>
            <ul className="list-disc ml-6">
              {insights.keywords.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Temas Sugeridos</h3>
            <ul className="list-disc ml-6">
              {insights.themes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

