import { Meta, StoryObj } from "@storybook/react";

import Tab from ".";
import { TabProps } from "./TabProps";

export default {
  title: "components/Tab",
  component: Tab,
  tags: ["autodocs"],
  args: {
    imagePath: "/assets/icon-links-header.svg",
    label: "Active",
  },
} as Meta<TabProps>;

export const Primary: StoryObj = {};
