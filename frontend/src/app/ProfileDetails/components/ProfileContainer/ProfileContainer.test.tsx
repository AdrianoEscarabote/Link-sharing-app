import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import getMockState from "@/utils/getMockState";

import ProfileContainer from ".";

const mockStore = configureMockStore();

const index = 1;
const id = 1;

jest.mock("react-dnd", () => ({
  useDrag: () => [
    {
      TYPE: "LINK",
      item: {
        id,
        index,
      },
    },
    jest.fn(),
  ],
  useDrop: () => [{}, jest.fn()],
  DndProvider: jest.fn(),
}));

jest.mock("react-dnd-html5-backend", () => ({
  HTML5Backend: jest.fn(),
}));

describe("Profile Container Component", () => {
  let store;

  beforeEach(() => {
    const mockState = getMockState();
    const state = mockStore(mockState);

    store = state;
  });

  it("should render correctly", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <ProfileContainer />
        </Provider>
      </DndProvider>
    );
  });
});
