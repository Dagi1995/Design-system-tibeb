import type { Preview } from '@storybook/nextjs-vite';
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
  decorators: [
    // If you have other decorators, you can add them here as well.
  ],
};

export default preview;