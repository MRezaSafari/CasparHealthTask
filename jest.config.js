/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: ["whatwg-fetch"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  };    