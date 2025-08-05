import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RadioGroup, RadioGroupItem } from "../../components/atoms/RadioGroup"
import { Label } from "../../components/atoms/Label";

const meta: Meta<typeof RadioGroup> = {
  title: "Design-system/Components/Atoms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" className="flex gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="r1" />
        <Label htmlFor="r1">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="r2" />
        <Label htmlFor="r2">Option Two</Label>
      </div>
    </RadioGroup>
  ),
}
