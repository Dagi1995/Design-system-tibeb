import type { StorybookConfig } from "@storybook/nextjs-vite";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../design-system/src/stories/**/*.mdx",
    "../design-system/src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {}
  },
  viteFinal(config) {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        // Make sure the relative path here correctly points to your mock file
        "next/navigation": path.resolve(__dirname, "./next-navigation-mock.ts"),
      },
    };
    return config;
  },
  staticDirs: [
    "../public" // cross-platform compatibility with forward slash is good
  ]
};

export default config;
