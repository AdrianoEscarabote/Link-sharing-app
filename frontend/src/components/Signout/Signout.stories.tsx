import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import store from "@/redux/store";

import SignoutComponent from ".";

export default {
  title: "components/Signout",
  component: SignoutComponent,
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
