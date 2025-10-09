import { Meta, StoryObj } from "@storybook/react";

import PreviewLinkDraggable from ".";
import { LinkDragTypes } from "./PreviewLinkDraggableTypes";

export default {
  title: "components/PreviewLinkDraggable",
  component: PreviewLinkDraggable,
  tags: ["autodocs"],
  args: {
    link: "/",
    label: "GitHub",
    index: 1,
  },
} as Meta<LinkDragTypes>;

export const Github: StoryObj = {};

export const FrontEndMentor: StoryObj = {
  args: {
    label: "Facebook",
  },
};
