const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8039',
    setupNodeEvents(on, config) {},
    pageLoadTimeout: 240000, // Meningkatkan pageLoadTimeout
    defaultCommandTimeout: 20000,
    chromeWebSecurity: false,
    supportFile: false,
  },
});
