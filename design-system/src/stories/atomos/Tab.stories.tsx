import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/atoms/Tabs'
import { Mail, Settings, Bell, User, Calendar } from 'lucide-react'

const meta: Meta<typeof Tabs> = {
  title: 'Design-system/Components/Atoms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'underline', 'pills', 'contained'],
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 rounded-md border">
          <p>Make changes to your account here.</p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 rounded-md border">
          <p>Change your password here.</p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4 rounded-md border">
          <p>Manage your notifications here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const UnderlineVariant: Story = {
  render: () => (
    <Tabs defaultValue="account" variant="underline" className="w-[400px]">
      <TabsList variant="underline">
        <TabsTrigger variant="underline" value="account">
          Account
        </TabsTrigger>
        <TabsTrigger variant="underline" value="password">
          Password
        </TabsTrigger>
        <TabsTrigger variant="underline" value="notifications">
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 rounded-md border">
          <p>Make changes to your account here.</p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 rounded-md border">
          <p>Change your password here.</p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4 rounded-md border">
          <p>Manage your notifications here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const PillsVariant: Story = {
  render: () => (
    <Tabs defaultValue="account" variant="pills" className="w-[400px]">
      <TabsList variant="pills">
        <TabsTrigger variant="pills" value="account">
          Account
        </TabsTrigger>
        <TabsTrigger variant="pills" value="password">
          Password
        </TabsTrigger>
        <TabsTrigger variant="pills" value="notifications">
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 rounded-md border">
          <p>Make changes to your account here.</p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 rounded-md border">
          <p>Change your password here.</p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4 rounded-md border">
          <p>Manage your notifications here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const ContainedVariant: Story = {
  render: () => (
    <Tabs defaultValue="account" variant="contained" className="w-[400px]">
      <TabsList variant="contained">
        <TabsTrigger variant="contained" value="account">
          Account
        </TabsTrigger>
        <TabsTrigger variant="contained" value="password">
          Password
        </TabsTrigger>
        <TabsTrigger variant="contained" value="notifications">
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 rounded-md border">
          <p>Make changes to your account here.</p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 rounded-md border">
          <p>Change your password here.</p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4 rounded-md border">
          <p>Manage your notifications here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="mail" className="w-[400px]">
      <TabsList>
        <TabsTrigger withIcon value="mail">
          <Mail className="h-4 w-4" /> Mail
        </TabsTrigger>
        <TabsTrigger withIcon value="settings">
          <Settings className="h-4 w-4" /> Settings
        </TabsTrigger>
        <TabsTrigger withIcon value="notifications">
          <Bell className="h-4 w-4" /> Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mail">
        <div className="p-4 rounded-md border">
          <p>Your mail content goes here.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4 rounded-md border">
          <p>Your settings content goes here.</p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4 rounded-md border">
          <p>Your notifications content goes here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}

export const VerticalOrientation: Story = {
  render: () => (
    <Tabs defaultValue="profile" orientation="vertical" className="flex gap-4 w-[400px]">
      <TabsList  className="flex-col h-[200px]">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="profile">
          <div className="p-4 rounded-md border">
            <p>Profile content goes here.</p>
          </div>
        </TabsContent>
        <TabsContent value="calendar">
          <div className="p-4 rounded-md border">
            <p>Calendar content goes here.</p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="p-4 rounded-md border">
            <p>Settings content goes here.</p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  ),
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2">Small</h3>
        <Tabs defaultValue="account" size="sm" className="w-[400px]">
          <TabsList>
            <TabsTrigger size="sm" value="account">
              Account
            </TabsTrigger>
            <TabsTrigger size="sm" value="password">
              Password
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-2">Medium (default)</h3>
        <Tabs defaultValue="account" size="md" className="w-[400px]">
          <TabsList >
            <TabsTrigger size="md" value="account">
              Account
            </TabsTrigger>
            <TabsTrigger size="md" value="password">
              Password
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-2">Large</h3>
        <Tabs defaultValue="account" size="lg" className="w-[400px]">
          <TabsList >
            <TabsTrigger size="lg" value="account">
              Account
            </TabsTrigger>
            <TabsTrigger size="lg" value="password">
              Password
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList fullWidth>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 rounded-md border">
          <p>Make changes to your account here.</p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 rounded-md border">
          <p>Change your password here.</p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4 rounded-md border">
          <p>Manage your notifications here.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
}