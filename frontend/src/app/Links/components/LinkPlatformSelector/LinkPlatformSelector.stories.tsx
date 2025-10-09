import { Meta, StoryObj } from "@storybook/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";

import store from "@/redux/store";

import LinkPlatformSelector from ".";

export default {
  title: "app/Links/LinkPlatformSelector",
  component: LinkPlatformSelector,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>{Story()}</DndProvider>
        </Provider>
      );
    },
  ],
} as Meta;

export const Primary: StoryObj = {};
