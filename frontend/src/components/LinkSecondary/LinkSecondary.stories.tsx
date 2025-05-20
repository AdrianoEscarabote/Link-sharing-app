import { Meta, StoryObj } from "@storybook/react";
import { LinkSecondaryProps } from "./LinkSecondaryProps";
import LinkSecondary from ".";

export default {
  title: "components/LinkSecondary",
  component: LinkSecondary,
  tags: ["autodocs"],
  args: {
    disabled: false,
    label: "Clique",
    href: "/",
  },
} as Meta<LinkSecondaryProps>;

export const Primary: StoryObj = {};
