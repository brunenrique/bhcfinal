import { addPendingRecord } from '@/lib/offlineRecords';

jest.mock('idb-keyval', () => ({ set: jest.fn() }));
jest.mock('nanoid', () => ({ nanoid: () => 'id1' }));

describe('offlineRecords', () => {
  it('salva registro pendente', async () => {
    const { set } = await import('idb-keyval');
    await addPendingRecord('p1', 'nota');
    expect(set).toHaveBeenCalled();
  });
});
