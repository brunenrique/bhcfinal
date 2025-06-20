import { initializeTestEnvironment, RulesTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { setDoc, getDoc, doc } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-project',
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

test('usuário não autenticado não pode escrever em users', async () => {
  const context = testEnv.unauthenticatedContext();
  const ref = doc(context.firestore(), 'users/u1');
  await assertFails(setDoc(ref, { nome: 'Ana' }));
});

test('usuário autenticado lê seu próprio perfil', async () => {
  const context = testEnv.authenticatedContext('u1');
  const ref = doc(context.firestore(), 'users/u1');
  await assertSucceeds(setDoc(ref, { role: 'psychologist' }));
  await assertSucceeds(getDoc(ref));
});
