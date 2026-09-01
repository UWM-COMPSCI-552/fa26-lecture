/* global module */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  coverageProvider: 'v8', 
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
