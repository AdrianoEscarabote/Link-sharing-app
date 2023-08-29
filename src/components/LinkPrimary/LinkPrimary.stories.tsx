import { Meta, StoryObj } from "@storybook/react";
import LinkPrimary from ".";
import { LinkPrimaryProps } from "./LinkPrimaryProps";

export default {
  title: "components/LinkPrimary",
  component: LinkPrimary,
  tags: ["autodocs"],
  args: {
    disabled: false,
    label: "Clique",
    href: "/Login",
  },
} as Meta<LinkPrimaryProps>;

export const Primary: StoryObj = {};
