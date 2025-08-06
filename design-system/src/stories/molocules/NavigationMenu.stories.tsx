import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "../../components/molocules/NavigationMenu"
import { BookAIcon, Goal } from "lucide-react"

const meta: Meta<typeof NavigationMenu> = {
  title: "Design-system/Components/Molecules/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}
export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-2 md:w-[200px]">
              <li>
                <NavigationMenuLink href="#">Product 1</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Product 2</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Product 3</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-2 md:w-[200px]">
              <li>
                <NavigationMenuLink href="#" className="flex flex-row items-center gap-2"><BookAIcon></BookAIcon>Docs</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#" className="flex flex-row items-center gap-2"> <Goal></Goal> Community</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#">About</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuIndicator />
      <NavigationMenuViewport />
    </NavigationMenu>
  ),
}
