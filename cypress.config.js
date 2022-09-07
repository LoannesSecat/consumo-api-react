const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //setupNodeEvents(on, config) { },
    screenshotOnRunFailure: false,
    video: false
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
