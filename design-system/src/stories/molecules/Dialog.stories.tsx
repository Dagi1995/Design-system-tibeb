import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../components/molecules/Dialog";
import { Button } from "../../components/atoms/Button";
import { Input } from "../../components/atoms/Input"; 
import { Label } from "../../components/atoms/Label"; 
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
  title: "Design-system/Components/Molecules/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const EditProfileForm: Story = {
  render: () => {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john@doe.com");

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information below.
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </form>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button variant="destructive">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
