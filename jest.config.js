module.exports = {
  projects: [
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
      roots: ['<rootDir>/src', '<rootDir>/tests'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      testMatch: ['**/*.test.ts?(x)'],
      testPathIgnorePatterns: ['<rootDir>/tests/firestore.rules.test.ts'],
    },
    {
      displayName: 'firestore',
      testEnvironment: 'node',
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      testMatch: ['<rootDir>/tests/firestore.rules.test.ts'],
    },
  ],
};
