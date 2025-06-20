import '@/styles/globals.css';
import { PT_Sans, Alegreya } from 'next/font/google';
import type { ReactNode } from 'react';

const ptSans = PT_Sans({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-sans' });
const alegreya = Alegreya({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-serif' });

export const metadata = { title: 'Thalamus' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className={`${ptSans.variable} ${alegreya.variable}`}> 
      <body className="font-sans bg-background text-foreground">{children}</body>
    </html>
  );
}
