import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/molocules/card";

const meta: Meta<typeof Card> = {
  title: "Design-system/Components/Molecules/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          "A Primer-style Card container with Header, Content and Footer slots.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description for the card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          This is the card content area. Add any elements here.
        </p>
      </CardContent>
      <CardFooter>
        <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Action
        </button>
      </CardFooter>
    </Card>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Join our platform today.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Email</label>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            type="email"
            placeholder="you@example.com"
          />
        </div>
      </CardContent>
      <CardFooter>
        <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Register
        </button>
      </CardFooter>
    </Card>
  ),
};
