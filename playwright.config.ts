import { defineConfig, devices } from "@playwright/test"

const singleProcess = process.env.PLAYWRIGHT_SINGLE_PROCESS === "1"

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./test-artifacts/playwright-output",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 300_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://portfolio.test",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Managed macOS sandboxes may deny Chromium's multiprocess Mach
        // service. Keep the workaround opt-in so normal CI stays realistic.
        launchOptions: singleProcess ? { args: ["--single-process"] } : undefined,
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
})
