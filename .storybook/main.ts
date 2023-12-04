import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  //stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  stories: ['../src/app/**/*.stories.@(js|ts|mdx)'],
  staticDirs: [{ from: '../src/assets', to: '/assets' }],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
