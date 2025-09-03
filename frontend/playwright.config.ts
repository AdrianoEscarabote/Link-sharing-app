import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: 1,
  reporter: [["list"], ["html", { outputFolder: "playwright-report" }]],
  use: {
    baseURL: "http://localhost:5427",
    headless: false,
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run build && npm run start",
    port: 5427,
    reuseExistingServer: !process.env.CI,
    cwd: "./",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
