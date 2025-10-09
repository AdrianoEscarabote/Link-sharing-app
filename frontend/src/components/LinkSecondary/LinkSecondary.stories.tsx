import { Meta, StoryObj } from "@storybook/react";

import LinkSecondary from ".";
import { LinkSecondaryProps } from "./LinkSecondaryProps";

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
