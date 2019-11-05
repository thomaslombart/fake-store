module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setup-tests.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    ".*": "babel-jest",
    "^.+\\.js?$": "babel-jest"
  }
};
