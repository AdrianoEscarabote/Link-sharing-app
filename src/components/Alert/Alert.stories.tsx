import { Meta, StoryObj } from "@storybook/react";
import AlertSaveChanges from ".";
import { AlertProps } from "./AlertProps";

export default {
  title: "components/AlertSaveChanges",
  component: AlertSaveChanges,
  tags: ["autodocs"],
  args: {
    show: true,
    altImage: "",
    imgPath: "/assets/icon-changes-saved.svg",
    text: "Your changes have been successfully saved!",
  },
} as Meta<AlertProps>;

export const Primary: StoryObj = {};
