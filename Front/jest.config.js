export default {
  clearMocks: true,
  transformIgnorePatterns: [
    "/node_modules/(?!(modulo-que-necesitas-transpilar)/)",
  ],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/jest.setup.js"],
};
