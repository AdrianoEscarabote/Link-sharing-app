import { Meta, StoryObj } from "@storybook/react";
import Button from "./index";
import { ButtonProps } from "./ButtonProps";

export default {
  title: "components/ButtonPrimary",
  component: Button,
  tags: ["autodocs"],
  args: {
    label: "Button",
    disabled: false,
    type: "button",
  },
} as Meta<ButtonProps>;

export const Primary: StoryObj = {};

export const Disabled: StoryObj = {
  args: {
    disabled: true,
  },
};

export const Small: StoryObj = {
  args: {
    maxWidth: "120px",
  },
};
