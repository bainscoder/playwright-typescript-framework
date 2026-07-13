import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";
dotenv.config();

if (!process.env.BASE_URL) {
  throw new Error(`
❌ Missing environment configuration
The BASE_URL environment variable is not defined.
Setup Instructions:
1. Copy ".env.example" to ".env"
2. Update the BASE_URL value in the .env file
3. Run the tests again
Example:
BASE_URL=https://your-application-url.com
`);
}
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 30000,
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"],['list'],['./src/support/Utils/customReporter.ts']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
  baseURL: process.env.BASE_URL,
  headless: true,
  screenshot:"only-on-failure",
  video:"retain-on-failure",
  trace:"retain-on-failure"
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
  },

  /* Configure projects for major browsers */
  projects: [
  {
    name: "setup",
    testMatch: /auth\.setup\.ts/,
  },

  {
    name: "login-tests",
    testMatch: /login\.spec\.ts/,
    use: {
      storageState: undefined,
    },
  },

  {
    name: "authenticated-tests",
    testIgnore: /login\.spec\.ts/,
    use: {
      storageState: "src/auth/user.json",
    },
    dependencies: ["setup"],
  },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
