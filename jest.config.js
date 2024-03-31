module.exports = {
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'], // Ignore the compiled TypeScript output directory
};