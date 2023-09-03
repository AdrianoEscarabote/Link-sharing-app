import { Meta, StoryObj } from "@storybook/react";
import PreviewPage from "./page";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default {
  title: "app/Preview/page",
  component: PreviewPage,
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
