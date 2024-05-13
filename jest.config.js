/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
    return {
      collectCoverage: true,
      collectCoverageFrom: [
          'src/**/**.{js,ts,tsx}',
          '!src/pages/_*.tsx',
          '!**/node_modules/**',
          '!src/**/*.stories.tsx',
      ],
      testMatch: ['<rootDir>/tests/**/*unit.spec.tsx'],
      testPathIgnorePatterns: [
        '/node_modules/',
        'tests/units/src/mocks'
      ],
      coverageThreshold : {
        global: {
            statements: 90,
            branches: 90,
            function: 90,
            lines: 90
        }
      },
      moduleNameMapper :{ '^uuid$': 'uuis'}
    };
  };