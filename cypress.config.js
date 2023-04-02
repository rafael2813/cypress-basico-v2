const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "viewportHeight": 880,
  "viewportWidth": 880,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
