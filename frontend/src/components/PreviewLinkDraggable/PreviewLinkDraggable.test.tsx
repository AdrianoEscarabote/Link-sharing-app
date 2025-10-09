import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import getMockState from "@/utils/getMockState";

import PreviewLinkDraggable from ".";

const mockStore = configureMockStore();

jest.mock("react-dnd", () => ({
  useDrag: jest.fn(),
  useDrop: jest.fn(),
  DndProvider: jest.fn(),
}));
jest.mock("react-dnd-html5-backend", () => ({
  HTML5Backend: jest.fn(),
}));

describe("Preview Link Draggable component", () => {
  let store;

  beforeEach(() => {
    const mockState = getMockState();
    const state = mockStore(mockState);

    store = state;
  });

  afterAll(() => jest.clearAllMocks());

  it("should render correctly", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <PreviewLinkDraggable
            index={1}
            label="GitHub"
            link="https://github.com/AdrianoEscarabote"
            moveLink={() => {}}
            size="large"
          />
        </Provider>
      </DndProvider>
    );
  });
});
