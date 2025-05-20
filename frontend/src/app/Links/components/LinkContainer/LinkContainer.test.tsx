import { render } from "@testing-library/react";
import LinkContainer from ".";
import getMockState from "@/utils/getMockState";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const mockStore = configureMockStore();

jest.mock("react-dnd", () => ({
  useDrag: jest.fn(),
  useDrop: jest.fn(),
  DndProvider: jest.fn(),
}));
jest.mock("react-dnd-html5-backend", () => ({
  HTML5Backend: jest.fn(),
}));

describe("Link container Component", () => {
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
          <LinkContainer />
        </Provider>
      </DndProvider>
    );
  });
});
