import { Meta, StoryObj } from "@storybook/react";

import ButtonSecondary from ".";
import { ButtonProps } from "./ButtonProps";

export default {
  title: "components/ButtonSecondary",
  component: ButtonSecondary,
  tags: ["autodocs"],
  args: {
    label: "Button",
    disabled: false,
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
