import { render, screen } from '@testing-library/react';
import { SessionEditor } from '@/features/sessions/SessionEditor';

jest.mock('@genkit-ai/next/client', () => ({
  runFlow: jest.fn().mockResolvedValue({ template: 'tpl' }),
}));

jest.mock('firebase/firestore', () => ({
  doc: () => ({}),
  getDoc: jest.fn().mockResolvedValue({ exists: () => false }),
  setDoc: jest.fn(),
}));

jest.mock('@/lib/firebase', () => ({
  db: {},
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ user: { uid: '1', email: 'a' } }),
}));

describe('SessionEditor', () => {
  it('exibe blocos padrao', () => {
    render(<SessionEditor patientId="p1" />);
    expect(screen.getByText('Objetivo')).toBeInTheDocument();
    expect(screen.getByText('Interven\xE7\xE3o')).toBeInTheDocument();
    expect(screen.getByText('Resposta')).toBeInTheDocument();
    expect(screen.getByText('Plano de A\xE7\xE3o')).toBeInTheDocument();
  });
});

