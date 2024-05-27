import type { Config } from "jest";

const config: Config = {
  watchman: false,
  preset: "ts-jest",
  testEnvironment: "node",
};

export default config;
