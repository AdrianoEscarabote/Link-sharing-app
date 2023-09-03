import { Meta, StoryObj } from "@storybook/react";
import SignoutComponent from ".";
import { Provider } from "react-redux";
import store from "@/redux/store";

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
