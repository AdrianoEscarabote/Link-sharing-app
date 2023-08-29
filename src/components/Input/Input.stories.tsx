import { Meta, StoryObj } from "@storybook/react";
import Input from ".";

export default {
  title: "components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    id: "email",
    autoComplete: "email",
  },
} as Meta;

export const Primary: StoryObj = {};
