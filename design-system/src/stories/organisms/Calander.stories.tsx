import type { Meta, StoryObj } from '@storybook/nextjs';
import Calendar from '../../components/organisms/Calander';
import { PhoneCall, Users, Book, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../../components//atoms/Button';
import { CalendarContext } from '../../components/organisms/Calander';

const meta: Meta<typeof Calendar> = {
  title: "Design-system/Components/Organisms/Calander",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    config: {
      control: {
        type: "object",
      },
    },
    events: {
      control: {
        type: "object",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    events: [
      {
        title: "English by Ryan Mathew",
        participant: "Ryan Mathew",
        id: "EDU-CSH-2024-00091",
        venue: "CNF-ROOM-2024-00001",
        fromDate: new Date(new Date().setHours(16, 30, 0)),
        toDate: new Date(new Date().setHours(17, 30, 0)),
        color: "violet",
      },
      {
        title: "Meeting with Team",
        participant: "Team",
        id: "EDU-CSH-2024-00092",
        venue: "Zoom",
        fromDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        toDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        color: "blue",
        isFullDay: true,
      },
    ],
    config: {
      defaultMode: "Month",
      isEditMode: false,
    },
  },
};

export const WithCustomIcons: Story = {
  args: {
    events: [
      {
        title: "English by Ryan Mathew",
        participant: "Ryan Mathew",
        id: "EDU-CSH-2024-00091",
        venue: "CNF-ROOM-2024-00001",
        fromDate: new Date(new Date().setHours(16, 30, 0)),
        toDate: new Date(new Date().setHours(17, 30, 0)),
        color: "violet",
        type_of_event: "Class",
      },
      {
        title: "Call with Client",
        participant: "Client",
        id: "EDU-CSH-2024-00093",
        venue: "Phone",
        fromDate: new Date(new Date().setHours(10, 0, 0)),
        toDate: new Date(new Date().setHours(10, 30, 0)),
        color: "green",
        type_of_event: "Call",
      },
      {
        title: "Team Meeting",
        participant: "Team",
        id: "EDU-CSH-2024-00094",
        venue: "Conference Room",
        fromDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        toDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        color: "blue",
        isFullDay: true,
        type_of_event: "Meeting",
      },
    ],
    config: {
      defaultMode: "Week",
      isEditMode: true,
      eventIcons: {
        Class: <Book className="h-3 w-3" />,
        Call: <PhoneCall className="h-3 w-3" />,
        Meeting: <Users className="h-3 w-3" />,
        Video: <Video className="h-3 w-3" />,
      },
      showIcon: true,
    },
  },
};

export const DisabledModes: Story = {
  args: {
    events: [
      {
        title: "English by Ryan Mathew",
        participant: "Ryan Mathew",
        id: "EDU-CSH-2024-00091",
        venue: "CNF-ROOM-2024-00001",
        fromDate: new Date(new Date().setHours(16, 30, 0)),
        toDate: new Date(new Date().setHours(17, 30, 0)),
        color: "violet",
      },
    ],
    config: {
      defaultMode: "Week",
      disableModes: ["Day"],
    },
  },
};

export const CustomHeader: Story = {
  args: {
    events: [
      {
        title: "English by Ryan Mathew",
        participant: "Ryan Mathew",
        id: "EDU-CSH-2024-00091",
        venue: "CNF-ROOM-2024-00001",
        fromDate: new Date(new Date().setHours(16, 30, 0)),
        toDate: new Date(new Date().setHours(17, 30, 0)),
        color: "violet",
      },
    ],
    config: {
      defaultMode: "Month",
    },
  },
  render: (args) => (
    <Calendar {...args}>
      <CalendarContext.Consumer>
        {({
          currentMonthYear,
          activeView,
          setActiveView,
          decrement,
          increment,
        }) => (
          <div className="flex items-center justify-between mb-4 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center space-x-4">
              <Button
                variant={activeView === "Month" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("Month")}
              >
                Month
              </Button>
              <Button
                variant={activeView === "Week" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("Week")}
              >
                Week
              </Button>
              <Button
                variant={activeView === "Day" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("Day")}
              >
                Day
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={decrement}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-bold">{currentMonthYear}</h2>
              <Button variant="outline" size="sm" onClick={increment}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() =>
                  setActiveView(
                    activeView === "Month"
                      ? "Week"
                      : activeView === "Week"
                      ? "Day"
                      : "Month"
                  )
                }
              >
                Toggle View
              </Button>
            </div>
          </div>
        )}
      </CalendarContext.Consumer>
    </Calendar>
  ),
};
