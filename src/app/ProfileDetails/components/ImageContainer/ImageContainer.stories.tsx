import { Meta, StoryObj } from "@storybook/react";
import ImageContainer from ".";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default {
  title: "app/ProfileDetails/ImageContainer",
  component: ImageContainer,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return <Provider store={store}>{Story()}</Provider>;
    },
  ],
} as Meta;

export const Primary: StoryObj = {};
