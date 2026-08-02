// @ts-check
import { defineConfig } from "@playwright/test";
require('dotenv').config();

export default defineConfig({
  testDir: "./tests",
  retries: 0,
  workers: 2,
  //fullyParallel: true,
  /* Maximum time one test can run for. */
  timeout: 250 * 1000,
  expect: {
    timeout: 60000,
  },
  reporter: 'html',
  // reporter: [
  //   ["allure-playwright", {
  //     detail: false,
  //     suiteTitle: false,
  //   }],
  //   ['html', { outputFolder: "./test-results" }],],
  projects: [
    // {
    //   name: "API",
    //   testMatch: "**/hooks.js",
    //   use: {
    //     browserName: "chromium",
    //     headless: false,
    //     screenshot: "on",
    //     // video: {
    //     //   mode: "on",
    //     //   size: { width: 1200, height: 880 },
    //     // },
    //     //video: 'retain-on-failure',
    //     ignoreHttpsErrors: true,
    //     permissions: ["geolocation"],
    //     viewport: { width: 1300, height: 900 },
    //     trace: "on",
    //     launchOptions: {
    //       slowMo: 600,
    //     },
    //   },

    // },
    {
      name: "testcases_regression",
      testMatch: "**/*.spec.js",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        video: {
          mode: "on",
          size: { width: 1200, height: 780 },
        },
        //video: 'retain-on-failure',
        ignoreHttpsErrors: true,
        permissions: ["geolocation"],
        viewport: { width: 1600, height: 1200 },
        trace: "on", //off,on
        launchOptions: {
          slowMo: 800,
        },
      },
    },
  ],
});
