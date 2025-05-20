import { Meta, StoryObj } from "@storybook/react";
import PreviewLink from "./index";
import { LinkTypes } from "./LinkTypes";

export default {
  title: "components/PreviewLink",
  component: PreviewLink,
  tags: ["autodocs"],
  args: {
    link: "/",
    label: "GitHub",
  },
} as Meta<LinkTypes>;

export const Github: StoryObj = {};

export const FrontEndMentor: StoryObj = {
  args: {
    label: "Facebook",
  },
};
