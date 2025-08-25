// ActivityCalendar.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActivityCalendar } from "../../components/molecules/ActivityCalendar";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof ActivityCalendar> = {
  title: "Design-system/Components/Molecules/ActivityCalendar",
  component: ActivityCalendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A compact calendar component showing activity on specific dates. Only displays Mondays, Wednesdays, and Fridays.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    activities: {
      description: "Array of objects containing dates and activity counts",
      control: {
        type: "object",
      },
    },
    onDateSelect: {
      description: "Callback function when a date is selected",
      action: "dateSelected",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityCalendar>;

// Sample activities for different scenarios
const sampleActivities = [
  { date: new Date(2024, 10, 4), count: 3 }, // Monday
  { date: new Date(2024, 10, 6), count: 5 }, // Wednesday
  { date: new Date(2024, 10, 8), count: 2 }, // Friday
  { date: new Date(2024, 10, 11), count: 1 }, // Monday
  { date: new Date(2024, 10, 13), count: 4 }, // Wednesday
  { date: new Date(2024, 10, 15), count: 7 }, // Friday
];

const highActivity = [
  { date: new Date(2024, 10, 4), count: 10 },
  { date: new Date(2024, 10, 6), count: 8 },
  { date: new Date(2024, 10, 8), count: 12 },
  { date: new Date(2024, 10, 11), count: 9 },
  { date: new Date(2024, 10, 13), count: 15 },
  { date: new Date(2024, 10, 15), count: 11 },
  { date: new Date(2024, 10, 18), count: 7 },
  { date: new Date(2024, 10, 20), count: 13 },
  { date: new Date(2024, 10, 22), count: 6 },
  { date: new Date(2024, 10, 25), count: 8 },
  { date: new Date(2024, 10, 27), count: 14 },
  { date: new Date(2024, 10, 29), count: 9 },
];

const noActivities: never[] = [];

// Default story
export const Default: Story = {
  args: {
    activities: sampleActivities,
  },
};

// High activity story
export const HighActivity: Story = {
  args: {
    activities: highActivity,
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar showing many days with high activity counts.",
      },
    },
  },
};

// No activities story
export const NoActivities: Story = {
  args: {
    activities: noActivities,
  },
  parameters: {
    docs: {
      description: {
        story: "Calendar with no activity on any days.",
      },
    },
  },
};

// Different month story
export const December: Story = {
  args: {
    activities: [
      { date: new Date(2024, 11, 2), count: 3 }, // Monday
      { date: new Date(2024, 11, 4), count: 5 }, // Wednesday
      { date: new Date(2024, 11, 6), count: 2 }, // Friday
      { date: new Date(2024, 11, 9), count: 1 }, // Monday
      { date: new Date(2024, 11, 11), count: 4 }, // Wednesday
      { date: new Date(2024, 11, 13), count: 7 }, // Friday
      { date: new Date(2024, 11, 16), count: 2 }, // Monday
      { date: new Date(2024, 11, 18), count: 3 }, // Wednesday
      { date: new Date(2024, 11, 20), count: 6 }, // Friday
      { date: new Date(2024, 11, 23), count: 4 }, // Monday
      { date: new Date(2024, 11, 25), count: 8 }, // Wednesday
      { date: new Date(2024, 11, 27), count: 5 }, // Friday
      { date: new Date(2024, 11, 30), count: 3 }, // Monday
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Calendar showing December with activities spread throughout the month.",
      },
    },
  },
};

// Interaction test
export const WithInteractions: Story = {
  args: {
    activities: sampleActivities,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Check that the calendar is rendered
    const calendar = canvas.getByText("Activity");
    await expect(calendar).toBeInTheDocument();

    // Check that the current month is displayed
    const monthYear = canvas.getByText("NOV 2024");
    await expect(monthYear).toBeInTheDocument();

    // Check that day headers are present
    await expect(canvas.getByText("Mon")).toBeInTheDocument();
    await expect(canvas.getByText("Wed")).toBeInTheDocument();
    await expect(canvas.getByText("Fri")).toBeInTheDocument();

    // Check that some days are displayed
    const day4 = canvas.getByText("4");
    await expect(day4).toBeInTheDocument();

    // Click on a day
    await userEvent.click(day4);
    await expect(args.onDateSelect).toHaveBeenCalled();
  },
};

// Navigation test
export const WithNavigation: Story = {
  args: {
    activities: sampleActivities,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Navigate to next month
    const nextButton = canvasElement.querySelector("button:last-of-type");
    if (nextButton) {
      await userEvent.click(nextButton);

      // Check that the month has changed (to December)
      const monthYear = canvas.getByText("DEC 2024");
      await expect(monthYear).toBeInTheDocument();
    }

    // Navigate to previous month
    const prevButton = canvasElement.querySelector("button:first-of-type");
    if (prevButton) {
      await userEvent.click(prevButton);
      await userEvent.click(prevButton); // Click twice to go to October

      // Check that the month has changed (to October)
      const monthYear = canvas.getByText("OCT 2024");
      await expect(monthYear).toBeInTheDocument();
    }
  },
};
