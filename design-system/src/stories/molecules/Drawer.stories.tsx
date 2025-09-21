// Drawer.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "../../components/molecules/drawer";
import { Button } from "../../components/atoms/Button";

const meta: Meta<typeof Drawer> = {
  title: "Design-system/Components/Molecules/Drawer",
  component: Drawer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// --- Default Bottom Drawer ---
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Bottom Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Bottom Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the bottom.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">Some content goes here.</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Confirm</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

// --- Right Drawer ---
export const Right: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Open Right Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Right Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the right.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">Sidebar-like content</div>
      </DrawerContent>
    </Drawer>
  ),
};

// --- Left Drawer ---
export const Left: Story = {
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button>Open Left Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Left Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides in from the left.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">Navigation or menu content</div>
      </DrawerContent>
    </Drawer>
  ),
};

// --- Top Drawer ---
export const Top: Story = {
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button>Open Top Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Top Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer slides down from the top.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">Banner-like drawer content</div>
      </DrawerContent>
    </Drawer>
  ),
};
