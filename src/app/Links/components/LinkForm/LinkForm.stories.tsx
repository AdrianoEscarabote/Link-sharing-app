import { Meta, StoryObj } from "@storybook/react";
import LinkForm from ".";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default {
  title: "app/Links/LinkForm",
  component: LinkForm,
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
