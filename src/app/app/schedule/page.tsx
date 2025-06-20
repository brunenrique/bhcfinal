'use client';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function SchedulePage() {
  const [selected, setSelected] = useState<Date | undefined>();
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agenda</h1>
      <DayPicker mode="single" selected={selected} onSelect={setSelected} />
    </main>
  );
}
