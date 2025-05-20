import { Meta, StoryObj } from "@storybook/react";
import CreateAccountPage from "./page";

export default {
  title: "app/CreateAccount/page",
  component: CreateAccountPage,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta;

export const Page: StoryObj = {};
