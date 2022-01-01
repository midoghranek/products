import { PlaywrightTestConfig, devices } from "@playwright/test";
import path from "path";

const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  testDir: path.join(__dirname, "e2e"),
  retries: 2,
  outputDir: "e2e-reports/",

  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
};

export default config;
