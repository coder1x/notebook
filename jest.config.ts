import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverage: false,
  // "coverageReporters": ["html"],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@helpers/(.*)$': '<rootDir>/src/shared/helpers/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@appRoutes/(.*)$': '<rootDir>/src/appRoutes/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },
  preset: './jest.preset.ts',
  setupFiles: ['./setupJest.ts'],
  name: 'project',
  verbose: true,
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  // collectCoverageFrom: ["src/**/{!(*.d.ts),}.{ts,js,.tsx,.jsx}"],
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  roots: ['<rootDir>/src'],
};
export default config;
