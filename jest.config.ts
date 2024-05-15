// /** @returns {Promise<import('jest').Config>} */
// module.exports = async () => {
//     return {
//       collectCoverage: true,
//       extensionsToTreatAsEsm: ['.ts, .tsx, js. jsx'],
//       collectCoverageFrom: [
//           'src/**/**.{js,ts,tsx}',
//           '!src/pages/_*.tsx',
//           '!**/node_modules/**',
//           '!src/**/*.stories.tsx',
//       ],
//       testMatch: ['<rootDir>/tests/**/*unit.spec.tsx'],
//       testPathIgnorePatterns: [
//         '/node_modules/',
//         'tests/units/src/mocks'
//       ],
//       coverageThreshold : {
//         global: {
//             statements: 90,
//             branches: 90,
//             function: 90,
//             lines: 90
//         }
//       },
//       moduleNameMapper :{ '^uuid$': 'uuis'}
//     };
//   };



// //   import type { Config } from 'jest'
// // import nextJest from 'next/jest.js'
 
// // const createJestConfig = nextJest({
// //   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
// //   dir: './',
// // })
 
// // // Add any custom config to be passed to Jest
// // const config: Config = {
// //   coverageProvider: 'v8',
// //   testEnvironment: 'jsdom',
// //   // Add more setup options before each test is run
// //   // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// // }
 
// // // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// // export default createJestConfig(config)


import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
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
    'tests/units/src/mocks'
  ],
  coverageThreshold : {
    global: {
        statements: 84,
        branches: 84,
        functions: 84,
        lines: 84
    }
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)