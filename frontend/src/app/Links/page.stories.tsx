import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import store from "@/redux/store";

import LinksPage from "./page";

export default {
  title: "app/Links/page",
  component: LinksPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return <Provider store={store}>{Story()}</Provider>;
    },
  ],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta;

export const Page: StoryObj = {};
