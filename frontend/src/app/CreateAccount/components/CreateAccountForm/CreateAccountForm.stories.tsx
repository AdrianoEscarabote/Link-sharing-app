import { Meta, StoryObj } from "@storybook/react";
import Form from ".";

export default {
  title: "app/CreateAccount/CreateAccountForm",
  component: Form,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta;

export const Primary: StoryObj = {};
