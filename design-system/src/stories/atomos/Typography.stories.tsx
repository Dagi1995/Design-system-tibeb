import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
  TypographyMuted,
} from "../../components/atoms/Typography"

const meta: Meta = {
  title: "Design-system/Components/Atoms/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

export const Heading1: StoryObj = {
  render: () => <TypographyH1>Heading 1</TypographyH1>,
}

export const Heading2: StoryObj = {
  render: () => <TypographyH2>Heading 2</TypographyH2>,
}

export const Heading3: StoryObj = {
  render: () => <TypographyH3>Heading 3</TypographyH3>,
}

export const Paragraph: StoryObj = {
  render: () => <TypographyP>This is a paragraph using the TypographyP component.</TypographyP>,
}

export const Muted: StoryObj = {
  render: () => <TypographyMuted>This is muted text.</TypographyMuted>,
}
