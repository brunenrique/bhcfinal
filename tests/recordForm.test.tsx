import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecordForm } from '@/features/records/RecordForm';

jest.mock('firebase/firestore', () => ({
  collection: () => ({}),
  addDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

jest.mock('@/lib/firebase', () => ({
  db: {},
}));

jest.mock('@/lib/encryption', () => ({
  encryptText: async (t: string) => ({ data: t, iv: 'iv' }),
}));

jest.mock('@/lib/offlineRecords', () => ({
  addPendingRecord: jest.fn(),
  syncPendingRecords: jest.fn(),
}));

describe('RecordForm', () => {
  it('mostra erro quando notas vazias', async () => {
    render(<RecordForm patientId="p1" />);
    await userEvent.click(screen.getByRole('button', { name: /salvar/i }));
    expect(
      await screen.findByText(/must contain at least 1 character/i)
    ).toBeInTheDocument();
  });
});
