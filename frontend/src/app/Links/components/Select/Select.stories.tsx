import { Meta, StoryObj } from "@storybook/react";
import Select from ".";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SelectProps } from "./SelectTypes";

export default {
  title: "app/Links/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    id: "1",
    onChange: () => {},
    platformSelected: "GitHub",
  },
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>{Story()}</DndProvider>
        </Provider>
      );
    },
  ],
} as Meta<SelectProps>;

export const Primary: StoryObj = {};
