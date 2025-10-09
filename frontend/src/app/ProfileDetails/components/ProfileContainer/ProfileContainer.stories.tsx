import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import store from "@/redux/store";

import ProfileContainer from ".";

export default {
  title: "app/ProfileDetails/ProfileContainer",
  component: ProfileContainer,
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

export const Primary: StoryObj = {};
