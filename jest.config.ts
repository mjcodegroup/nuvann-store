import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  extensionsToTreatAsEsm: ['.ts, .tsx, js. jsx'],
  collectCoverageFrom: [
      'src/**/**.{js,ts,tsx}',
      '!src/pages/_*.tsx',
      '!src/pages/api/**',
      '!**/node_modules/**',
      '!src/**/*.stories.tsx',
      '!src/utils/enums/**',
      '!src/utils/mocks/**',
      '!src/**/*types.ts'
  ],
  testMatch: ['<rootDir>/tests/**/*.unit.spec.tsx'],
  testPathIgnorePatterns: [
    '/node_modules/',
    'tests/units/src/mocks',
    '/.next/'
  ],
  coverageThreshold : {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90
    }
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)