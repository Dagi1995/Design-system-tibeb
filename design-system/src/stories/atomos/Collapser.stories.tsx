import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../components/atoms/Collapser"
import { Button } from "../../components/atoms/Button"
import { Card, CardContent } from "../../components/molocules/Card"
import { ArrowDown, ArrowUp } from "lucide-react"
const meta: Meta<typeof Collapsible> = {
  title: "Design-system/Components/Atoms/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">
            {open ? <ArrowUp></ArrowUp> : <ArrowDown></ArrowDown>} Details
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="mt-4">
            <CardContent>
              <p className="text-sm text-muted-foreground">
                1, This is some collapsible content inside a card. You can put anything here.<br></br>
                2, This is some collapsible content inside a card. You can put anything here.<br></br>,
                3, This is some collapsible content inside a card. You can put anything here.<br></br>
                4, This is some collapsible content inside a card. You can put anything here
              </p>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}
