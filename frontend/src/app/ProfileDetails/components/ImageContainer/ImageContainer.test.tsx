import { render } from "@testing-library/react";
import ImageContainer from ".";
import getMockState from "@/utils/getMockState";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore();

describe("Image Container Component", () => {
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
        <ImageContainer />
      </Provider>
    );
  });
});
