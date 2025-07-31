import {Meta, StoryObj} from "@storybook/nextjs-vite";
import {LoginForm} from "../../components/organisms/LoginForm";

const meta:Meta<typeof LoginForm> = {
    title: "Design-system/Components/Organisms/LoginForm",
    component: LoginForm,
    parameters: {
        layout: "centered",
    },
}

export default meta;
type Story = StoryObj<typeof LoginForm>
export const Default:Story = {};