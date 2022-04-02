
module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  collectCoverageFrom: [
    '<rootDir/src/**/*.ts',
    '<rootDir/main/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
  // preset: '@shelf/jest-mongodb' only for jest-mongodb
}
