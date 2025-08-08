"use client"

import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../../components/molocules/DropdownMenu"

import { Button } from "../../components/atoms/Button"

const meta: Meta<typeof DropdownMenu> = {
  title: "Design-system/Components/Molecules/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => {
    const [showBookmarks, setShowBookmarks] = React.useState(true)
    const [selectedFramework, setSelectedFramework] = React.useState("next")

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Application</DropdownMenuLabel>
          <DropdownMenuItem>
            Dashboard
            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Messages
            <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showBookmarks}
            onCheckedChange={setShowBookmarks}
          >
            Show Bookmarks
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Frameworks</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={selectedFramework}
            onValueChange={setSelectedFramework}
          >
            <DropdownMenuRadioItem value="next">Next.js</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="nuxt">Nuxt.js</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="remix">Remix</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>GitHub Copilot</DropdownMenuItem>
              <DropdownMenuItem>Live Share</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}
