import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextEditor } from "../../components/organisms/TextEditor";

const meta: Meta<typeof TextEditor> = {
  title: "Design_system/Components/Organisms/TextEditor",
  component: TextEditor,
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
      description: "Initial HTML content for the editor",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when editor is empty",
    },
    onChange: {
      action: "changed",
      description: "Callback when editor content changes",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextEditor>;

export const Default: Story = {
  args: {
    placeholder: "Start typing here...",
  },
};

export const WithInitialContent: Story = {
  args: {
    content:
      "<h1>Welcome</h1><p>This is some <strong>initial</strong> content.</p>",
  },
};

export const WithTable: Story = {
  args: {
    content: `
      <h2>Sample Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>25</td>
          </tr>
          <tr>
            <td>Jane</td>
            <td>30</td>
          </tr>
        </tbody>
      </table>
    `,
  },
};

export const WithCodeBlock: Story = {
  args: {
    content: `
      <h2>Code Example</h2>
      <pre><code class="language-javascript">function hello() {
  console.log('Hello world!');
}</code></pre>
    `,
  },
};

export const ReadOnly: Story = {
  args: {
    content: "<h1>Read Only Content</h1><p>This content cannot be edited.</p>",
    onChange: undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ opacity: 0.7 }}>
        <Story />
      </div>
    ),
  ],
};
