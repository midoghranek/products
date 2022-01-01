// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "@modules": "<rootDir>/modules/index.ts",
    "@components": "<rootDir>/shared/components/index.ts",
    "@containers": "<rootDir>/shared/containers/index.ts",
    "@templates": "<rootDir>/shared/templates/index.ts",
    "@hooks": "<rootDir>/shared/hooks/index.ts",
    "@services": "<rootDir>/shared/services/index.ts",
    "@store": "<rootDir>/shared/store/index.tsx",
    "@validators": "<rootDir>/shared/utils/validators/index.ts",
    "@svgs": "<rootDir>/shared/utils/svgs/index.ts",
    "@helpers": "<rootDir>/shared/utils/helpers/index.ts",
    "@configs": "<rootDir>/shared/utils/configs/index.ts",
    "@constants": "<rootDir>/shared/utils/constants/index.ts",
    "@locales": "<rootDir>/shared/utils/locales/index.ts",
    "@theme": "<rootDir>/shared/utils/theme/index.ts",
    "@types": "<rootDir>/shared/utils/types/index.ts",
    "@utils/test": "<rootDir>/shared/utils/test/index.tsx",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["e2e", "node_modules"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
