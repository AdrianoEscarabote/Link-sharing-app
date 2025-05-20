import { Meta, StoryObj } from "@storybook/react";
import LinkContainer from ".";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default {
  title: "app/Links/LinkContainer",
  component: LinkContainer,
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
