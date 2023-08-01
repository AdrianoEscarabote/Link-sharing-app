import { Meta, StoryObj } from "@storybook/react";
import { TabProps } from "./TabProps";
import Tab from ".";

export default {
  title: "components/shared/Tab",
  component: Tab,
  tags: ["autodocs"],
  args: {
    imagePath: "/assets/icon-links-header.svg",
    label: "Active",
  },
} as Meta<TabProps>;

export const Primary: StoryObj = {};
