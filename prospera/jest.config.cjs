// import { readFileSync } from "fs";
// import { resolve } from "path";

// export default {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
//   globals: {
//     __DEV__: JSON.parse(readFileSync(resolve(__dirname, "../.env"), "utf8"))
//       .DEV,
//   },
// };

module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg|mp4)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: ["/node_modules/"],
};
