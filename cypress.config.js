// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: "https://test-roic.conceptvines.com",
//     specPattern: "cypress/integration/**/*.cy.js",
//     setupNodeEvents(on, config) {
//       console.log("SetupNodeEvents running...");
//       return config;
//     },
//   },
// });

const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://test-roic.conceptvines.com",
    specPattern:"cypress/integration/**/*.cy.js",//"cypress/e2e/dashboardFlow_SA.cy.js",//"cypress/e2e/dashboardFlow_BU.cy.js",//"cypress/e2e/roiFlow_BU.cy.js",,"cypress/e2e/salescoach.cy.js",, "cypress/e2e/roiFlow_SA.cy.js",
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      allure: true,
      allureResultsPath: "allure-results" // Keep consistent with Jenkins
    }
  },

  // 👇 These are top-level options
  video: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: `cypress/videos/run-${new Date().toISOString().replace(/[:.]/g, '-')}`
});


