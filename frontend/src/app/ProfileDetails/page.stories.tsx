import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import store from "@/redux/store";

import ProfileDetailsPage from "./page";

export default {
  title: "app/ProfileDetails/page",
  component: ProfileDetailsPage,
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
