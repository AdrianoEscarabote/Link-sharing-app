import { Meta, StoryObj } from "@storybook/react";
import ImageUpload from ".";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default {
  title: "app/ProfileDetails/ImageUpload",
  component: ImageUpload,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return <Provider store={store}>{Story()}</Provider>;
    },
  ],
} as Meta;

export const Primary: StoryObj = {};
