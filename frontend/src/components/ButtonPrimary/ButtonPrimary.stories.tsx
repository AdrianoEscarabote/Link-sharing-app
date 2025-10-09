import { Meta, StoryObj } from "@storybook/react";

import { ButtonProps } from "./ButtonProps";
import Button from "./index";

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
