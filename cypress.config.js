const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  e2e: {},
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
