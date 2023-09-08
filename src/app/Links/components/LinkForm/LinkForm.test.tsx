import { render } from "@testing-library/react";
import LinkForm from ".";
import getMockState from "@/utils/getMockState";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureMockStore();
const id = 1;
const index = 1;
jest.mock("react-dnd", () => ({
  useDrag: () => [
    {
      type: "LINK",
      item: { id, index },
    },
    jest.fn(),
  ],
  useDrop: () => [{}, jest.fn()],
  DndProvider: jest.fn(),
}));

jest.mock("react-dnd-html5-backend", () => ({
  HTML5Backend: jest.fn(),
}));

describe("Link form Component", () => {
  let store;

  beforeEach(() => {
    const mockState = getMockState();
    const state = mockStore(mockState);

    store = state;
  });

  afterAll(() => jest.clearAllMocks());

  it("should render correctly", () => {
    render(
      <Provider store={store}>
        <LinkForm />
      </Provider>
    );
  });
});
