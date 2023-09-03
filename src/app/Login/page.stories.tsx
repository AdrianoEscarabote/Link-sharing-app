import { Meta, StoryObj } from "@storybook/react";
import LoginPage from "./page";

export default {
  title: "app/Login/page",
  component: LoginPage,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta;

export const Page: StoryObj = {};
