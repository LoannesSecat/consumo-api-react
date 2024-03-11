import { defineConfig } from "cypress";

export default defineConfig({
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
