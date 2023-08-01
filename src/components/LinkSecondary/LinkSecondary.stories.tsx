import { Meta, StoryObj } from "@storybook/react";
import { LinkSecondaryProps } from "./LinkSecondaryProps";
import LinkSecondary from ".";

export default {
  title: "components/shared/LinkSecondary",
  component: LinkSecondary,
  tags: ["autodocs"],
  args: {
    disabled: false,
    label: "Clique",
    href: "/",
  },
} as Meta<LinkSecondaryProps>;

export const Primary: StoryObj = {};
